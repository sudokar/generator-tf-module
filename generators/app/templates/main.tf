terraform {
  required_providers {
    null = {
      version = "3.1.0"
      source  = "hashicorp/null"
    }
  }
}

resource "null_resource" "example" {}
