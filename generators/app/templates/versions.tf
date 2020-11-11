terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~>3.47.0"
    }
    google-beta = {
      source = "hashicorp/google"
      version = "~>3.47.0"
    }
  }
  required_version = ">= <%= tfVersion %>"
}