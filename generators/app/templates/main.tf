terraform {
  required_providers {
    null = {
      version = "3.1.1"
      source  = "hashicorp/null"
    }
  }
}

resource "null_resource" "example" {}
