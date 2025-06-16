CREATE DATABASE  IF NOT EXISTS `plataforma_alojamentos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `plataforma_alojamentos`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: plataforma_alojamentos
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alojamentos`
--

DROP TABLE IF EXISTS `alojamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamentos` (
  `id` char(36) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` text,
  `localizacao` varchar(255) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `tipo` enum('quarto','apartamento','outro') DEFAULT NULL,
  `comodidades` text,
  `facilitadorId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `facilitadorId` (`facilitadorId`),
  CONSTRAINT `alojamentos_ibfk_1` FOREIGN KEY (`facilitadorId`) REFERENCES `utilizadores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamentos`
--

LOCK TABLES `alojamentos` WRITE;
/*!40000 ALTER TABLE `alojamentos` DISABLE KEYS */;
INSERT INTO `alojamentos` VALUES ('a1','Quarto no centro','Quarto mobilado perto da universidade.','Lisboa',300.00,'quarto','WiFi, Cozinha','u2'),('a2','Apartamento T1','Apartamento espaçoso com varanda.','Porto',500.00,'apartamento','WiFi, TV, Varanda','u2'),('ad935958-ea52-4748-997e-3d318c49f187','Residência Estudantil A','Muito confortável e perto da universidade.','Vila do Conde',450.00,'quarto','Wi-Fi, Lavandaria, Aquecimento','u2');
/*!40000 ALTER TABLE `alojamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` char(36) NOT NULL,
  `alojamentoId` char(36) NOT NULL,
  `estudanteId` char(36) NOT NULL,
  `pontuacao` int NOT NULL,
  `comentario` text,
  PRIMARY KEY (`id`),
  KEY `alojamentoId` (`alojamentoId`),
  KEY `estudanteId` (`estudanteId`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`alojamentoId`) REFERENCES `alojamentos` (`id`),
  CONSTRAINT `avaliacoes_ibfk_2` FOREIGN KEY (`estudanteId`) REFERENCES `utilizadores` (`id`),
  CONSTRAINT `avaliacoes_chk_1` CHECK ((`pontuacao` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES ('v2','a2','u2',4,'Apartamento bem equipado, mas barulhento à noite.');
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` char(36) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descricao` text,
  `data` datetime DEFAULT NULL,
  `localizacao` varchar(255) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `facilitadorId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `facilitadorId` (`facilitadorId`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`facilitadorId`) REFERENCES `utilizadores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES ('e1','Feira Académica','Evento cultural com exposições e concertos.','2025-06-15 18:00:00','Lisboa','cultural','u2');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_reservas`
--

DROP TABLE IF EXISTS `historico_reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico_reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dataReserva` datetime NOT NULL,
  `estado` varchar(50) NOT NULL,
  `utilizadorId` char(36) NOT NULL,
  `alojamentoId` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilizadorId` (`utilizadorId`),
  KEY `alojamentoId` (`alojamentoId`),
  CONSTRAINT `historico_reservas_ibfk_1` FOREIGN KEY (`utilizadorId`) REFERENCES `utilizadores` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historico_reservas_ibfk_2` FOREIGN KEY (`alojamentoId`) REFERENCES `alojamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_reservas`
--

LOCK TABLES `historico_reservas` WRITE;
/*!40000 ALTER TABLE `historico_reservas` DISABLE KEYS */;
INSERT INTO `historico_reservas` VALUES (13,'2025-06-10 09:00:00','cancelada','u2','a2'),(15,'2025-06-20 18:15:00','concluída','u2','a1'),(16,'2025-06-16 02:35:32','Criada','2862a763-f6d4-4251-aad7-aa8590caa19f','ad935958-ea52-4748-997e-3d318c49f187'),(17,'2025-06-16 03:02:37','Cancelada','2862a763-f6d4-4251-aad7-aa8590caa19f','ad935958-ea52-4748-997e-3d318c49f187'),(18,'2025-06-16 03:27:39','Criada','2862a763-f6d4-4251-aad7-aa8590caa19f','ad935958-ea52-4748-997e-3d318c49f187'),(19,'2025-06-16 03:31:50','Criada','2862a763-f6d4-4251-aad7-aa8590caa19f','ad935958-ea52-4748-997e-3d318c49f187');
/*!40000 ALTER TABLE `historico_reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes` (
  `id` char(36) NOT NULL,
  `utilizadorId` char(36) NOT NULL,
  `assunto` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `mensagem` text NOT NULL,
  `lida` tinyint(1) DEFAULT '0',
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilizadorId` (`utilizadorId`),
  CONSTRAINT `notificacoes_ibfk_1` FOREIGN KEY (`utilizadorId`) REFERENCES `utilizadores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
INSERT INTO `notificacoes` VALUES ('af9a3514-aa02-4338-8d08-73cdcb722763','2862a763-f6d4-4251-aad7-aa8590caa19f','Reserva criada','reserva','A sua reserva para o alojamento ad935958-ea52-4748-997e-3d318c49f187 foi criada com sucesso.',0,'2025-06-16 03:31:50'),('n1','u2','Nova Reserva','reserva','Nova reserva recebida para o alojamento Quarto no centro.',0,'2025-06-02 12:36:01');
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` char(36) NOT NULL,
  `alojamentoId` char(36) DEFAULT NULL,
  `utilizadorId` char(36) DEFAULT NULL,
  `dataInicio` date DEFAULT NULL,
  `dataFim` date DEFAULT NULL,
  `status` enum('pendente','aceite','rejeitado','concluída') NOT NULL DEFAULT 'pendente',
  PRIMARY KEY (`id`),
  KEY `alojamentoId` (`alojamentoId`),
  KEY `estudanteId` (`utilizadorId`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`alojamentoId`) REFERENCES `alojamentos` (`id`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`utilizadorId`) REFERENCES `utilizadores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES ('c087a2ea-ba60-4d53-87d8-911b035abade','ad935958-ea52-4748-997e-3d318c49f187','2862a763-f6d4-4251-aad7-aa8590caa19f','2025-07-18','2025-07-19','pendente'),('edcd1d7e-e7ed-4e90-bfdd-ed24ff6c2da4','ad935958-ea52-4748-997e-3d318c49f187','2862a763-f6d4-4251-aad7-aa8590caa19f','2025-07-16','2025-07-17','pendente');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizadores`
--

DROP TABLE IF EXISTS `utilizadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizadores` (
  `id` char(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perfil` enum('estudante','facilitador','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizadores`
--

LOCK TABLES `utilizadores` WRITE;
/*!40000 ALTER TABLE `utilizadores` DISABLE KEYS */;
INSERT INTO `utilizadores` VALUES ('2862a763-f6d4-4251-aad7-aa8590caa19f','Teste User','teste@example.com','123456','estudante'),('u2','João Costa','joao@example.com','hash_joao','facilitador'),('u3','Admin','admin@example.com','hash_admin','admin');
/*!40000 ALTER TABLE `utilizadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'plataforma_alojamentos'
--

--
-- Dumping routines for database 'plataforma_alojamentos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16 19:41:25
