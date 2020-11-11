terraform {
  required_providers {
    <%= tfProvider %> = {
      source = "hashicorp/<%= tfProvider %>"
      version = "~><%= tfProviderVersion %>"
    }
  }
  required_version = ">= <%= tfVersion %>"
}