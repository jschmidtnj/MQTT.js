'use strict'

/**
 * NOTE: QUIC is experimentally implemented in Node currently.
 *
 * OPENSSL OMC does not want to land QUIC support until at least OPENSSL 3.1. So until QUIC
 * API support is delivered in a stable OPENSSL release, it will be an experimental feature.
 *
 * QUIC Basics:
 * QUIC is a UDP-based network transport protocol that includes built-in security
 * via TLS 1.3, flow control, error correction, connection migration, multiplexing, and more.
 *
 * This UDP-based transport protocol is intended to ultimately replace the use of TCP for all HTTP traffic.
 * Why use QUIC over TLS in Node.js?
 * - 60% faster TLS Handshake completion compared to Node.js TCP+TCP.
 * - 20-70% Faster Data Transfer with current benchmarks (depends heavily on what the data
 *   is and how it's provided).
*/

const mqtt = require('mqtt')
var fs = require('fs')
var path = require('path')
const PORT = 443

var KEY = fs.readFileSync(path.join(__dirname, '/tls-key.pem'))
var CERT = fs.readFileSync(path.join(__dirname, '/tls-cert.pem'))
const HOST = 'stark'

const options = {
  port: PORT,
  host: HOST,
  key: KEY,
  cert: CERT,
  rejectUnauthorized: true,
  protocol: 'quic'
}

const client = mqtt.connect(options)

client.subscribe('messages')
client.publish('messages', 'Current time is: ' + new Date())
client.on('message', function (topic, message) {
  console.log(message)
})

client.on('connect', function () {
  console.log('Connected')
})
