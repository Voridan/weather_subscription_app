#!/bin/sh
set -e

yarn prisma:migrate

yarn start:dev
