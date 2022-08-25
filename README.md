# Genesis Block Africa Developer Challenge

This is a developer challenge project for a Full-Stack PHP developer for Genesis Block Africa

### Notes

1. Functional programming was used for the PHP code as was specified in the project requirements
2. Minimum PHP version is 7.2 (Enforced by `inpsyde/composer-assets-compiler`)
3. Any Front-End framework could be used so opted for React and MUI
4. Detailed project requirements can be found [here]("./Genesis - PHP Developer Dev Test.pdf")

## Setting Up

This project heavily relies on composer to setup and install node packages used for the interface. Installing entails

1. `git clone https://github.com/richard-muvirimi/genesis-block-developer-challenge && cd genesis-block-developer-challenge`
2. `echo "install dependencies" && composer install` (Auto installs npm dependencies, it it fails run `npm install && npm run build`)
3. Rename `.env.example` to `.env` and edit with your environment variables
4. `echo "run code sniffer and tests" && composer qc`
5. Visit `http://yourinstall/install` to create tables and import initial data into the database
6. Done!

## Login

A default user account is created on install with the following credentials

* Username: tygalive@gmail.com
* Password: password

## License 

ISC License

```
Copyright 2022 Richard Muvirimi

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```