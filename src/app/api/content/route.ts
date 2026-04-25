import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const CONTENT_PATH = join(process.cwd(), 'data', 'content.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'aura2024'

function readContent() {
  return JSON.parse(readFileSync(CONTENT_PATH, 'utf-8'))
}

export async function GET() {
  try {
    const content = readContent()
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { password, content } = body

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!content || typeof content !== 'object') {
      return NextResponse.json({ error: 'Invalid content' }, { status: 400 })
    }

    writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
