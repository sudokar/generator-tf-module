terraform {
  backend "gcs" {
    bucket = "<%= backendGcsBucket %>"
    prefix = "<%= backendGcsPrefix %>"
  }
}
