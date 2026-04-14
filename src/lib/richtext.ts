type LexicalNode = {
  type: string
  text?: string
  children?: LexicalNode[]
  format?: number | string
  tag?: string
  listType?: string
}

type LexicalRoot = {
  root: {
    children: LexicalNode[]
  }
}

export function richTextToPlainText(richText: LexicalRoot | null | undefined): string {
  if (!richText?.root?.children) return ''

  function extractText(nodes: LexicalNode[]): string {
    return nodes
      .map((node) => {
        if (node.text) return node.text
        if (node.children) return extractText(node.children)
        return ''
      })
      .join('')
  }

  return richText.root.children.map((block) => {
    if (block.children) return extractText(block.children)
    return ''
  }).join('\n\n')
}

export function richTextToHtml(richText: LexicalRoot | null | undefined): string {
  if (!richText?.root?.children) return ''

  function renderNodes(nodes: LexicalNode[]): string {
    return nodes
      .map((node) => {
        if (node.type === 'text') {
          let text = node.text || ''
          if (typeof node.format === 'number') {
            if (node.format & 1) text = `<strong>${text}</strong>`
            if (node.format & 2) text = `<em>${text}</em>`
          }
          return text
        }
        if (node.type === 'paragraph') {
          return `<p>${renderNodes(node.children || [])}</p>`
        }
        if (node.type === 'heading') {
          const tag = node.tag || 'h2'
          return `<${tag}>${renderNodes(node.children || [])}</${tag}>`
        }
        if (node.type === 'list') {
          const tag = node.listType === 'number' ? 'ol' : 'ul'
          return `<${tag}>${renderNodes(node.children || [])}</${tag}>`
        }
        if (node.type === 'listitem') {
          return `<li>${renderNodes(node.children || [])}</li>`
        }
        if (node.children) return renderNodes(node.children)
        return ''
      })
      .join('')
  }

  return renderNodes(richText.root.children)
}
