<template>
  <div>
    <input
      ref="input"
      :value="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="block w-full bg-blue-grey-100 my-2 p-2 rounded-md border-2  placeholder-blue-grey-600 focus:border-blue-grey-100"
      :class="{ 'border-red-vivid-500': hasError, 'border-blue-grey-100': !hasError }"
      @input="$emit('input', $event.target.value)"
    >
    <div
      v-if="hasError"
      ref="error"
      class="text-sm text-red-vivid-500"
    >
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    errors: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    hasError () {
      return this.errors && this.errors[this.name] && this.errors[this.name].length
    },
    errorText () {
      if (this.hasError) {
        return this.errors[this.name].join(' ')
      }
      return ''
    }
  }
}
</script>
