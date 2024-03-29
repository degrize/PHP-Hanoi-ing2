
-- Table: hanoi_authority

-- DROP TABLE hanoi_authority;

CREATE TABLE hanoi_authority
(
  name varchar(50) NOT NULL,
  CONSTRAINT hanoi_authority_pkey PRIMARY KEY (name)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

-- Table: hanoi_joueur

-- DROP TABLE hanoi_joueur;

CREATE TABLE hanoi_joueur( 
    id bigint AUTO_INCREMENT PRIMARY KEY, 
    email varchar(255),
    login varchar(255), 
    mot_de_passe varchar(255), 
    photo varchar(255), 
    est_suspendu boolean DEFAULT FALSE, 
    piece DOUBLE NULL DEFAULT 0.0,
    niveau_actuel INT NOT NULL DEFAULT 3,
    musique BOOLEAN NOT NULL DEFAULT TRUE,
    last_login BIGINT NULL,
    cree_le DATETIME, 
    modifie_le DATETIME,
    CONSTRAINT ux_joueur_email UNIQUE (email),
    CONSTRAINT ux_joueur_login UNIQUE (login)
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

-- Table: hanoi_joueur_authority

-- DROP TABLE hanoi_joueur_authority;

CREATE TABLE hanoi_joueur_authority
(
  joueur_id bigint NOT NULL,
  authority_name varchar(50) NOT NULL,
  CONSTRAINT hanoi_joueur_authority_pkey PRIMARY KEY (joueur_id, authority_name),
  CONSTRAINT fk_authority_name FOREIGN KEY (authority_name)
      REFERENCES hanoi_authority (name) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_joueur_id FOREIGN KEY (joueur_id)
      REFERENCES hanoi_joueur (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

-- Table: hanoi_niveau

-- DROP TABLE hanoi_niveau;

CREATE TABLE hanoi_niveau(
    id int AUTO_INCREMENT PRIMARY KEY,
    titre varchar(255),
    description varchar(255),
    deplacement_max int,
    temps_max int,
    nbre_disque int,
    gain DOUBLE NULL DEFAULT 0.0
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

-- Table: hanoi_rel_niveau_joueur

-- DROP TABLE hanoi_rel_niveau_joueur;

CREATE TABLE hanoi_rel_niveau_joueur(
    niveau_id int NOT NULL,
    joueur_id bigint NOT NULL,
    deplacement int DEFAULT 0,
    temps int DEFAULT 0,
    CONSTRAINT hanoi_niveau_joueur_pkey PRIMARY KEY (niveau_id, joueur_id),
    CONSTRAINT fk_hanoi_rel_niveau_joueur__niveau_id FOREIGN KEY (niveau_id)
    	REFERENCES hanoi_niveau (id) MATCH SIMPLE
    	ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk_hanoi_rel_niveau_joueur__joueur_id FOREIGN KEY (joueur_id)
    	REFERENCES hanoi_joueur (id) MATCH SIMPLE
    	ON UPDATE NO ACTION ON DELETE NO ACTION
    
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

-- Table: hanoi_logs

-- DROP TABLE hanoi_logs;

CREATE TABLE hanoi_logs(
    id bigint AUTO_INCREMENT,
    joueur_id bigint NOT NULL,
    information varchar(255),
    cree_le DATETIME,
    CONSTRAINT hanoi_logs_pkey PRIMARY KEY (id),
    CONSTRAINT fk_hanoi_logs__joueur_id FOREIGN KEY (joueur_id)
    	REFERENCES hanoi_joueur (id) MATCH SIMPLE
    	ON UPDATE NO ACTION ON DELETE NO ACTION
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

CREATE TABLE hanoi_contact_us(
    id bigint AUTO_INCREMENT PRIMARY KEY, 
    email varchar(255), nom varchar(255), 
    objet varchar(255), message varchar(255), 
    send_date DATETIME 
)
ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE hanoi_multijoueurs( 
    id bigint NOT NULL AUTO_INCREMENT, 
    niveau_id int NOT NULL,
    joueur_id bigint NOT NULL,
    nom_salle varchar(255),
    cle_salle varchar(255), 
    nbre_joueur varchar(255), 
    cree_le DATETIME,
    CONSTRAINT hanoi_multijoueurs_pkey PRIMARY KEY (id),
    CONSTRAINT fk_hanoi_multijoueurs__niveau_id FOREIGN KEY (niveau_id)
    	REFERENCES hanoi_niveau (id) MATCH SIMPLE
    	ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT fk_hanoi_multijoueurs__joueur_id FOREIGN KEY (joueur_id)
    	REFERENCES hanoi_joueur (id) MATCH SIMPLE
    	ON UPDATE NO ACTION ON DELETE NO ACTION
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8
;

ALTER TABLE `hanoi_joueur` ADD `multijoueur` BOOLEAN NOT NULL DEFAULT FALSE AFTER `last_login`;

ALTER TABLE `hanoi_multijoueurs` ADD `victoire` BOOLEAN NOT NULL DEFAULT FALSE AFTER `nbre_joueur`;
