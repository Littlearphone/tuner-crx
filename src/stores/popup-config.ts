import {markRaw} from 'vue'
import {merge} from 'lodash-es'
import {defineStore} from 'pinia'
// @ts-ignore
import {setStorage} from '~/common/support'
// @ts-ignore
import {DefaultConfig} from '~/common/constant'
import SliderField from '../popup/component/SliderField.vue'
import SwitchField from '../popup/component/SwitchField.vue'
import UploadField from '../popup/component/UploadField.vue'

const components = {
  'SliderField': markRaw(SliderField),
  'SwitchField': markRaw(SwitchField),
  'UploadField': markRaw(UploadField),
}
const {VITE_POPUP_ID, VITE_EMPTY_POPUP} = process.env
export const usePopupConfigStore = defineStore('popup-config', {
  state: () => ({
    empty: VITE_EMPTY_POPUP === 'true',
    description: {
      ...DefaultConfig,
      configId: VITE_POPUP_ID
    }
  }),
  actions: {
    saveDescription(data: any) {
      const configId: any = this.description.configId;
      const config = {[configId]: {...this.description, ...data, fields: []}};
      const fields = data.fields || [];
      fields.forEach((field: any) => {
        config[configId][field.key] = field.value
      })
      setStorage(JSON.parse(JSON.stringify(config))).then(() => console.log('保存成功: ', config))
    },
    enableConfig() {
      this.empty = false
    },
    mergeConfig(site: any) {
      this.description.configId = site.id;
      merge(this.description, site.description);
      (this.description.fields || []).forEach((field: any) => {
        if (this.description.hasOwnProperty(field.key)) {
          // @ts-ignore
          field.value = this.description[field.key]
        }
        if (components.hasOwnProperty(field.type)) {
          // @ts-ignore
          field.type = components[field.type]
        }
      })
    },
  }
})
