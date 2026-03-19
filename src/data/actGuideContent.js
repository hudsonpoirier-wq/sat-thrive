import { ACT_GUIDE_MODULES } from './actGuideCatalog.js'

export const ACT_GUIDE_CONTENT = Object.fromEntries(
  ACT_GUIDE_MODULES.map((module) => [
    module.id,
    {
      intro: module.intro,
      concepts: module.concepts,
      problems: module.problems,
    },
  ])
)
