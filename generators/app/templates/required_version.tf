terraform {
<% if (tfVersion == '13') { %>  required_version = ">= 0.13.0"<% } -%>
<% if (tfVersion == '14') { %>  required_version = ">= 0.14.0"<% } %>
}
