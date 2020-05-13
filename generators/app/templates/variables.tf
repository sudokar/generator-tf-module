variable "mandatory" {
  type        = string
  description = "this field is mandatory"
}

variable "optional" {
  type        = string
  default     = "default_value"
  description = "this field is optional"
}
