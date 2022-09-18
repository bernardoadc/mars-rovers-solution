export default function (value, schema, mentionWrongValueWith) {
  const error = schema.validate(value, { abortEarly: false }).error

  if (error) return error.details // eslint-disable-line curly
    .map(function (d) {
      let msg = '➤ ' // bullet
      if (mentionWrongValueWith) msg += `"${d.context.value}" ${mentionWrongValueWith} `
      msg += d.message.replaceAll('"', '') // allows better/custom phrasing

      return msg
    })
    .join('\n') + '\n' // aggregate and return string with all error messages
  else return ''
}
