FROM node:14-alpine

ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

LABEL org.label-schema.build-date=$BUILD_DATE \
    org.label-schema.name="Terraform Generator" \
    org.label-schema.description="Scaffolding for new Terraform project" \
    org.label-schema.url="https://github.com/sudokar/generator-tf-module" \
    org.label-schema.vcs-ref=$VCS_REF \
    org.label-schema.vcs-url="https://github.com/sudokar/generator-tf-module" \
    org.label-schema.vendor="github.com/sudokar" \
    org.label-schema.version=$VERSION \
    org.label-schema.schema-version="1.0"

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh curl && \
    echo -n "Node: " && node -v && echo -n "npm: " && npm -v && \
    npm install --global --silent yo && \
    adduser -D -u 501 yeoman && \
    echo "yeoman ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

ENV HOME /home/yeoman

RUN mkdir /generated && chown yeoman:yeoman /generated
WORKDIR /generated

RUN npm install --global --silent generator-tf-module && \
    mkdir -p /home/yeoman/.config/configstore && \
    chmod g+rwx /home/yeoman /home/yeoman/.config /home/yeoman/.config/configstore

USER yeoman

CMD ["yo", "tf-module", "--no-insight"]