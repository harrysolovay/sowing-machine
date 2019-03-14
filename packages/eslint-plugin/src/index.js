import {noUndef} from './rules'

export default {
  rules: {
    'no-undef': noUndef,
  },
  configs: {
    config: {
      rules: {
        'no-undef': 'off',
        'sowing-machine/no-undef': 'error',
      },
    },
  },
}
