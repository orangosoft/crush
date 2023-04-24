import { LabelSchema, ProjectSchema } from '@/services/tasks/schemas'

export function parsePriority(str: string) {
  const regex = /\b(p1|p2|p3|p4)\b/gi
  return str.match(regex)
}

export function parseProjects(str: string) {
  const regex = /#(\w+)/g
  const matches = str.match(regex)
  if (matches) {
    return matches.map(match => {
      const name = match.replace('#', '')
      return ProjectSchema.parse({ name })
    })
  } else {
    return []
  }
}

export function parseLabels(str: string) {
  const regex = /@(\w+)/g
  const matches = str.match(regex)
  if (matches) {
    return matches.map(match => {
      const name = match.replace('@', '')
      return LabelSchema.parse({ name })
    })
  } else {
    return []
  }
}
