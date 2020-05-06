import { FormField, HandlesValidationErrors } from 'laravel-nova'
import mixin from '../mixin'
import nmlList from '../module/List/'
import nmlFile from '../module/File/'
import nmlTrix from '../module/Trix/'
import nmlCallback from '../module/Callback/'

export default {
  mixins: [mixin, FormField, HandlesValidationErrors],
  components: { nmlList, nmlFile, nmlTrix, nmlCallback },
  props: ['field'],
  data() {
    return {
      isFormField: true,
      isHidden: this.field.isHidden === true
    }
  },
  mounted() {
    this.$nextTick(() => {
      let field = document.getElementById('fields[en][' + this.field.name + ']')

      if(field) {
        field.value = Array.isArray(this.value) ? JSON.stringify(this.value) : this.value
      }
    });
  },
  methods: {
    setInitialValue() {
      this.value = this.field.value || null
    },
    fill(formData) {
      if ( Array.isArray(this.value) ) this.value = JSON.stringify(this.value);
      formData.append(this.field.attribute, this.value || null)
    },
    handleChange(value) {
      this.value = value

      let field = document.getElementById('fields[en][' + this.field.name + ']')

      if(field) {
        field.value = this.value
      }
    }
  }
}
