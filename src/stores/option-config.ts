import {defineStore} from 'pinia'
import {onMounted, ref} from 'vue'

export const DEFAULT_ACTIONS = [
  {id: 'block', name: 'Block'},
  {id: 'redirect', name: 'Redirect'},
]
export const DEFAULT_RESOURCES = [
  {id: 'font', name: 'Font'},
  {id: 'image', name: 'Image'},
  {id: 'script', name: 'Script'},
  {id: 'sub_frame', name: 'Sub-Frame'},
  {id: 'main_frame', name: 'Main Frame'},
  {id: 'stylesheet', name: 'Stylesheet'},
  {id: 'xmlhttprequest', name: 'XML HTTP Request'},
]

export const DEFAULT_RULES = [
  {
    'id': 1,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://ajax.loli.net/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://ajax\\.googleapis\\.com/(.*)',
      'resourceTypes': [
        'font',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 2,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://fonts.loli.net/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://fonts\\.googleapis\\.com/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 3,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://themes.loli.net/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://themes\\.googleusercontent\\.com/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 4,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://gstatic.loli.net/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://fonts\\.gstatic\\.com/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 5,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://www.recaptcha.net/recaptcha/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://www\\.google\\.com/recaptcha/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 6,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://gravatar.loli.net/\\3'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://(secure|www)\\.gravatar\\.com/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 7,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://cdn.staticfile.org/twitter-bootstrap/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://maxcdn\\.bootstrapcdn\\.com/bootstrap/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 8,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://cdn.staticfile.org/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://maxcdn\\.bootstrapcdn\\.com/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  },
  {
    'id': 9,
    'priority': 1,
    'action': {
      'type': 'redirect',
      'redirect': {
        'regexSubstitution': '\\1://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/\\2'
      }
    },
    'condition': {
      'regexFilter': '^(http[s]?)://cdn\\.rawgit\\.com/google/code-prettify/master/loader/(.*)',
      'resourceTypes': [
        'font',
        'image',
        'script',
        'stylesheet',
        'sub_frame',
        'main_frame',
        'xmlhttprequest'
      ]
    }
  }
]

async function getDynamicRules() {
  const request = chrome.declarativeNetRequest
  if (!request || typeof request.getDynamicRules !== 'function') {
    return location.hostname === 'localhost' ? DEFAULT_RULES : []
  }
  return await request.getDynamicRules()
}

async function setDynamicRules(ruleOptions) {
  const request = chrome.declarativeNetRequest
  if (!request || typeof request.getDynamicRules !== 'function') {
    return
  }
  await request.updateDynamicRules(ruleOptions)
}

export const useOptionConfigStore = defineStore('option-config', () => {
  const optionFormVisible = ref(false)
  const optionFormData = ref({})
  const optionFormId = ref(-1)
  const dynamicRules = ref([])
  onMounted(async () => {
    const rules = await getDynamicRules()
    if (!rules || !rules.length) {
      console.log('set default dynamic rules')
      await setDynamicRules({addRules: DEFAULT_RULES})
    }
    dynamicRules.value = await getDynamicRules()
  })

  function showOptionForm(row) {
    optionFormId.value = row.id
    optionFormVisible.value = true
    const copy = JSON.parse(JSON.stringify(row))
    optionFormData.value = Object.assign({condition: {}, action: {}}, copy)
  }

  return {optionFormId, optionFormData, optionFormVisible, dynamicRules, showOptionForm}
})
