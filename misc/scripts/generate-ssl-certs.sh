#!/bin/bash

if [ ! -e server.js ]
then
	echo "Error: could not find main application server.js file"
	echo "You should run the generate-ssl-certs.sh script from the main MEAN application root directory"
	echo "i.e: bash scripts/generate-ssl-certs.sh"
	exit -1
fi

echo "Generating self-signed certificates..."
mkdir -p ./settings/sslcerts
openssl genrsa -out ./settings/sslcerts/key.pem 4096
openssl req -new -key ./settings/sslcerts/key.pem -out ./settings/sslcerts/csr.pem
openssl x509 -req -days 365 -in ./settings/sslcerts/csr.pem -signkey ./settings/sslcerts/key.pem -out ./settings/sslcerts/cert.pem
rm ./settings/sslcerts/csr.pem
chmod 600 ./settings/sslcerts/key.pem ./settings/sslcerts/cert.pem
