
#!/bin/bash
npm install
timestamp=`date "+%Y%m%d-%H%M%S"`
BULD_DIR=./_builds/
rm -rf ${BULD_DIR}
mkdir  ${BULD_DIR}
echo $timestamp

zip -v -r ./_builds/app-$timestamp.zip  ./* ./package.json

zip -v -r ./_builds/email_sender_tests_coverage-$timestamp.zip  ./tests/unit/_coverage/*

ls -la ./_builds