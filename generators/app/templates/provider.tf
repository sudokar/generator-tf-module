provider "google" {
  project     = "my-project-id"
  region      = "us-central1"
  zone        = "us-central1-c"
}

provider "google-beta" {
  project     = "my-project-id"
  region      = "us-central1"
  zone        = "us-central1-c"
}