/**
 * Catch uncaught exceptions & unhandled rejections
 */

import { worker } from 'cluster'

import log from 'common/log'

const workerMessage = worker ? ` on worker ${worker.id}` : ''

process.on('rejectionHandled', () => {})
process.on('unhandledRejection', (p, reason) => {
	log.error('Unhandled Promise Rejection%s:', workerMessage, p)
	reason.catch(err => log.error({ err }))
})

process.on('uncaughtException', err => {
	log.error('Uncaught Exception%s:', workerMessage)
	log.error({ err })

	throw err
})
