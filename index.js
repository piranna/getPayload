function getPayload(res)
{
  const contentType = res.headers.get("content-type")

  if(contentType)
  {
    if(contentType.includes("application/json"))
      return res.json()

    if(contentType.includes("multipart/form-data"))
      return res.formData()

    return res.text()
  }

  // TODO according to spec, we should try to guess the correct content-type

  return res.arrayBuffer()
}

function getPayloadError(res)
{
  return getPayload(res)
  .then(function(payload)
  {
    if(!res.ok) throw payload

    return payload
  })
}


exports.getPayload      = getPayload
exports.getPayloadError = getPayloadError
