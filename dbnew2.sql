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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mobile` varchar(255) NOT NULL,
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
  `iscompleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table machineapp.billing: ~4 rows (approximately)
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` (`id`, `name`, `mobile`, `machineid`, `baseamount`, `minutes`, `totalamount`, `startdate`, `enddate`, `paidstatus`, `invoiceid`, `isstarted`, `startedtime`, `pausedtime`, `ispaused`, `iscompleted`) VALUES
	(46, 'Hjr', '138', '123', '60', '1', '1', '2021-05-13 20:11:00', '2021-05-13 20:12:00', 'un paid', '0', 0, NULL, NULL, 0, 1),
	(47, 'Dnsjs', '459', '123', '25', '1', '0', '2021-05-13 20:20:00', '2021-05-13 20:21:00', 'un paid', '0', 0, NULL, NULL, 0, 1);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;

-- Dumping structure for table machineapp.machines
CREATE TABLE IF NOT EXISTS `machines` (
  `machineid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0x',
  `machinename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `mobile1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `mobile2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `otp` varchar(100) NOT NULL DEFAULT '',
  `isbusy` tinyint(1) NOT NULL DEFAULT '1',
  `role` varchar(255) NOT NULL,
  `uniqueid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mobile1`) USING BTREE,
  UNIQUE KEY `mobile2` (`mobile2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table machineapp.machines: ~0 rows (approximately)
/*!40000 ALTER TABLE `machines` DISABLE KEYS */;
INSERT INTO `machines` (`machineid`, `machinename`, `mobile1`, `mobile2`, `isactive`, `otp`, `isbusy`, `role`, `uniqueid`) VALUES
	('aadsad123', 'machine1', '123', '321', 1, '234231', 0, 'machine', '2cudyt47');
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
  `uniqueid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mobile`),
  UNIQUE KEY `uniqueid` (`uniqueid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table machineapp.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userid`, `firstname`, `lastname`, `mobile`, `role`, `isactive`, `otp`, `isbusy`, `uniqueid`) VALUES
	('b02dcd28-ac10-11eb-b6d8-00ff2a599786\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 'karthik', 'D', '7010543395', 'user', 1, '878352', 0, NULL),
	('f447a669-af4a-11eb-87b5-00ff2a599786', 'Karthik', '2', '9876543210', 'user', 1, '168286', 0, NULL),
	('0771568d-b3bf-11eb-9bb8-00ff2a599786', 'Kk', 'Kw', '9876543216', 'user', 1, '728620', 0, '0'),
	('f447a669-af4a-11eb-87b5-00ff2a599785', 'Karthik', '3', '9999', 'user', 1, '581785', 0, '2cudyt47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
