
#!/bin/bash
npm install
timestamp=`date "+%Y%m%d-%H%M%S"`
BULD_DIR=./_artifacts/
rm -rf ${BULD_DIR}
mkdir  ${BULD_DIR}
echo $timestamp

zip -v -r ./_artifacts/email_sender_tests_coverage.zip  ./tests/unit/_coverage/*

ls -la ./_artifacts