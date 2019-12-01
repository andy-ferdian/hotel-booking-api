-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.37-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for hotelbooksys
CREATE DATABASE IF NOT EXISTS `hotelbooksys` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hotelbooksys`;

-- Dumping structure for table hotelbooksys.calendar_table
CREATE TABLE IF NOT EXISTS `calendar_table` (
  `cal_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table hotelbooksys.calendar_table: ~6 rows (approximately)
/*!40000 ALTER TABLE `calendar_table` DISABLE KEYS */;
INSERT INTO `calendar_table` (`cal_date`) VALUES
	('2019-11-30'),
	('2019-12-01'),
	('2019-12-02'),
	('2019-12-03'),
	('2019-12-04'),
	('2019-12-05'),
	('2019-12-06');
/*!40000 ALTER TABLE `calendar_table` ENABLE KEYS */;

-- Dumping structure for table hotelbooksys.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `cusId` int(11) NOT NULL AUTO_INCREMENT,
  `cusName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`cusId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table hotelbooksys.customer: ~6 rows (approximately)
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`cusId`, `cusName`, `email`, `password`) VALUES
	(14, 'Andy', 'andy@gmail.com', '$2a$10$neFm7ILgn4xt7uFZB7SIgu0zUn0BnyVNkD00E1POv6gMG5ySGYBB2'),
	(15, 'Rio', 'rio@gmail.com', '$2a$10$hNJWvpL3IWcLMMhEH4L5Eujt7xmIJhPx1FbkEr9O.KqRxL9jD6DvK');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

-- Dumping structure for table hotelbooksys.reservation
CREATE TABLE IF NOT EXISTS `reservation` (
  `rsvId` int(11) NOT NULL AUTO_INCREMENT,
  `cusId` int(11) NOT NULL,
  `roomId` int(11) DEFAULT NULL,
  `dateCheckIn` date DEFAULT NULL,
  `dateCheckOut` date DEFAULT NULL,
  `roomQty` int(11) DEFAULT NULL,
  PRIMARY KEY (`rsvId`),
  KEY `FK__customer` (`cusId`),
  KEY `FK_reservation_rooms` (`roomId`),
  CONSTRAINT `FK__customer` FOREIGN KEY (`cusId`) REFERENCES `customer` (`cusId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_reservation_rooms` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`roomId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Dumping data for table hotelbooksys.reservation: ~6 rows (approximately)
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` (`rsvId`, `cusId`, `roomId`, `dateCheckIn`, `dateCheckOut`, `roomQty`) VALUES
	(12, 14, 12, '2019-11-30', '2019-12-01', 6),
	(13, 14, 13, '2019-11-30', '2019-12-02', 3),
	(14, 14, 18, '2019-11-30', '2019-12-01', 5),
	(15, 14, 13, '2019-12-02', '2019-12-03', 2),
	(16, 14, 12, '2019-12-02', '2019-12-03', 10),
	(17, 15, 13, '2019-12-03', '2019-12-04', 1);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;

-- Dumping structure for table hotelbooksys.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `roomId` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `roomType` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`roomId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Dumping data for table hotelbooksys.rooms: ~2 rows (approximately)
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` (`roomId`, `description`, `roomType`, `image`, `quantity`, `price`) VALUES
	(12, 'Standard Room', 'standard', NULL, 10, 100000),
	(13, 'Executive Room', 'executive', NULL, 5, 200000),
	(18, 'Suite Room', 'suite', NULL, 7, 300000);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
