resource "google_compute_instance" "example" {
  name         = "example-yeoman-generator"
  machine_type = "e2-medium"
  zone         = "us-west1-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }

  metadata_startup_script = file("${path.module}/templates/cloud-config.yaml")

  service_account {
    scopes = ["userinfo-email", "compute-ro", "storage-ro"]
  }
}
