# Terraform module generator 

<a href='https://ko-fi.com/O4O0RSHV' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

Scaffolding for new Terraform module projects

### Features

-   `main.tf`, `variables.tf`,`outputs.tf` files to module root
    
-   `.editorconfig`, `.gitignore` and `.terraform-version` files to module root
    
-   `.pre-commit-config.yaml` for `terraform fmt`, `terradocs`, `go fmt` and `check-merge-conflict`
    
-   `test` directory with an example test file based on [Terratest](https://github.com/gruntwork-io/terratest)
    
-   `example` directory
    

### Installation

1.  Install [nodejs](https://nodejs.org/en/download/)
    
2.  Install Yeoman (npm install -g yo)
    
3.  Install this generator
    

```shell
npm install -g generator-tf-module
```

### Usage

To use the included generator execute the below command in shell and provide your new module name for the prompt

```sh
> yo tf-module
...
? Enter a name for the terraform module :  example-module
```

Project layout generated for the new module

```
example-module
├── .editorconfig
├── .pre-commit-config.yaml
├── .terraform-version
├── example
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
├── main.tf
├── outputs.tf
├── test
│   └── example_test.go
└── variables.tf
```

### Maintainers

This project is maintained by [sudokar](https://github.com/sudokar)

### License

MIT

#### Keywords

[terraform](https://www.npmjs.com/search?q=keywords:terraform) [scaffolding](https://www.npmjs.com/search?q=keywords:scaffolding) [yeoman](https://www.npmjs.com/search?q=keywords:yeoman) [terraform module](https://www.npmjs.com/search?q=keywords:terraform%20module)
