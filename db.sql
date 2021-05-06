-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.24 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table machineapp.billing
CREATE TABLE IF NOT EXISTS `billing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `machineid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `baseamount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `minutes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `totalamount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `paidstatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `invoiceid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isstarted` tinyint NOT NULL,
  `startedtime` datetime DEFAULT NULL,
  `pausedtime` datetime DEFAULT NULL,
  `ispaused` tinyint NOT NULL DEFAULT '0',
  `iscompleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table machineapp.billing: ~5 rows (approximately)
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` (`id`, `userid`, `machineid`, `baseamount`, `minutes`, `totalamount`, `startdate`, `enddate`, `paidstatus`, `invoiceid`, `isstarted`, `startedtime`, `pausedtime`, `ispaused`, `iscompleted`) VALUES
	(25, '36', '1234', '60', '1', '1', '2021-05-06 00:43:00', '2021-05-06 00:44:00', 'un paid', '0', 0, NULL, NULL, 0, 1),
	(26, '37', '123', '120', '2', '4', '2021-05-06 00:47:00', '2021-05-06 00:49:00', 'un paid', '0', 0, NULL, NULL, 0, 1),
	(27, '37', '1234', '150', '2', '4', '2021-05-06 00:47:00', '2021-05-06 00:49:00', 'un paid', '0', 0, NULL, NULL, 0, 1),
	(28, '36', '123', '100', '1', '1', '2021-05-06 00:43:00', '2021-05-06 00:44:00', 'un paid', '0', 0, NULL, NULL, 0, 1),
	(30, '36', '123', '20', '1', '0.3333333333333333', '2021-05-06 11:47:00', '2021-05-06 11:48:00', 'un paid', '0', 0, NULL, NULL, 0, 1),
	(31, '36', '123', '60', '1', '1', '2021-05-06 14:32:00', '2021-05-06 14:33:00', 'un paid', '0', 0, NULL, NULL, 0, 1);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;

-- Dumping structure for table machineapp.machines
CREATE TABLE IF NOT EXISTS `machines` (
  `machineid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0x',
  `machinename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `mobile` varchar(255) NOT NULL DEFAULT '0',
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `otp` varchar(100) NOT NULL DEFAULT '',
  `isbusy` tinyint(1) NOT NULL DEFAULT '1',
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table machineapp.machines: ~4 rows (approximately)
/*!40000 ALTER TABLE `machines` DISABLE KEYS */;
INSERT INTO `machines` (`machineid`, `machinename`, `mobile`, `isactive`, `otp`, `isbusy`, `role`) VALUES
	('e523399e-abc6-11eb-b6d8-00ff2a599786', 'abcd777', '123', 1, '9009', 0, 'machine'),
	('e90d13aa-abc6-11eb-b6d8-00ff2a599786', 'abcd8', '123047', 0, '9009', 0, 'machine'),
	('e6f7d413-abc6-11eb-b6d8-00ff2a599786', 'abcd999', '1234', 1, '9009', 0, 'machine'),
	('e2eb47b8-abc6-11eb-b6d8-00ff2a599786', 'abcd8', '123947', 1, '9009', 1, 'machine');
/*!40000 ALTER TABLE `machines` ENABLE KEYS */;

-- Dumping structure for table machineapp.users
CREATE TABLE IF NOT EXISTS `users` (
  `userid` varchar(255) NOT NULL DEFAULT '',
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mobile` varchar(255) NOT NULL DEFAULT '0',
  `role` varchar(50) DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `otp` varchar(100) NOT NULL DEFAULT '',
  `isbusy` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table machineapp.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userid`, `firstname`, `lastname`, `mobile`, `role`, `isactive`, `otp`, `isbusy`) VALUES
	('4dc99e80-ac06-11eb-b6d8-00ff2a599786\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 'user', 'one', '123047', 'user', 1, '9009', 0),
	('e21da59e-adc4-11eb-87b5-00ff2a599786', 'K', 'jk', '36', 'user', 1, '748144', 0),
	('5c032a8b-add6-11eb-87b5-00ff2a599786', 'Ragam', 'K', '37', 'user', 1, '014783', 0),
	('23d59ea4-adc5-11eb-87b5-00ff2a599786', 'Io', 'Js', '69', 'user', 1, '001282', 0),
	('f4036ad3-ac10-11eb-b6d8-00ff2a599786\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 'karthik', 'D', '70', 'user', 1, '9', 0),
	('b02dcd28-ac10-11eb-b6d8-00ff2a599786\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 'karthik', 'D', '7010543395', 'user', 1, '876382', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
