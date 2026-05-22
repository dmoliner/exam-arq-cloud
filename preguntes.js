const testPreguntes = [
    {
        "pregunta": "1. Quin avantatge financer clau proporciona el model de Cloud Computing respecte a la infraestructura tradicional?",
        "opcions": [
            "a) L 'eliminació total de les despeses operatives (OPEX).",
            "b) La transformació de la despesa de capital (CAPEX) en despesa operativa (OPEX).",
            "c) La transformació de la despesa operativa (OPEX) en despesa de capital (CAPEX).",
            "d) La fixació de costos mensuals inalterables independentment del consum."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Passar d'inversió fixa CAPEX a pagament per ús OPEX",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "2. Quina és la principal diferència entre escalabilitat i elasticitat dinàmica a Azure?",
        "opcions": [
            "a) L 'escalabilitat s'aplica a màquines virtuals i l'elasticitat a bases de dades.",
            "b) L 'escalabilitat és la capacitat de manejar un increment de demanda, mentre que l'elasticitat és l'assignació i desassignació automàtica i en temps real de recursos.",
            "c) Són conceptes idèntics utilitzats en diferents models de servei.",
            "d) L 'elasticitat requereix intervenció manual, l'escalabilitat és automàtica."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Escalabilitat = Increment càrrega; Elasticitat = Ajust automàtic en temps real",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "3. En el model Plataforma com a Servei (PaaS), quina és la responsabilitat principal del client?",
        "opcions": [
            "a) Mantenir els servidors físics i la refrigeració.",
            "b) Gestionar el sistema operatiu, els pegats i l'entorn d'execució.",
            "c) Desenvolupar i gestionar l'aplicació i el codi, així com les dades.",
            "d) Configurar exclusivament les identitats d'accés, sense tocar l'aplicació."
        ],
        "respostaCorrecta": 2,
        "justificacio": "En PaaS, l'usuari aporta el codi/dades, Azure gestiona infraestructura i SO",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "4. Quina eina s'ha d'utilitzar abans d'una migració per comparar els costos actuals on-premise (incloent electricitat i espai) amb els costos projectats a Azure?",
        "opcions": [
            "a) Azure Pricing Calculator",
            "b) Azure Cost Management",
            "c) Azure Advisor",
            "d) Calculadora TCO (Total Cost of Ownership)"
        ],
        "respostaCorrecta": 3,
        "justificacio": "TCO compara on-premise amb núvol; Pricing només estima núvol",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "5. Quin servei d'Azure és un clar exemple de Programari com a Servei (SaaS)?",
        "opcions": [
            "a) Azure Virtual Machines",
            "b) Azure App Service",
            "c) Microsoft 365 / Azure AI (serveis cognitius consumits via API)",
            "d) Azure Kubernetes Service (AKS)"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Producte final complet",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "6. Quin principi fonamental defineix l'estratègia \"Zero Trust\" (Confiança Zero)?",
        "opcions": [
            "a) Confiar en qualsevol dispositiu que es connecti des de la xarxa corporativa local.",
            "b) Verificar sempre, mai confiar, i aplicar privilegis mínims independentment de la ubicació.",
            "c) Deshabilitar les contrasenyes per a tots els usuaris externs.",
            "d) Eliminar l'autenticació multifactor (MFA) per agilitzar l'accés."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Verificar sempre, mai confiar, privilegis mínims",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "7. Quins són els tres components que formen una assignació de Control d'Accés Basat en Rols (RBAC)?",
        "opcions": [
            "a) Usuari, Contrasenya, i MFA.",
            "b) Principal de seguretat, Definició de rol, i Àmbit (Scope).",
            "c) Tenant, Subscripció, i Grup de Recursos.",
            "d) Identitat Administrada, Active Directory, i Permís de Lectura."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Principal de seguretat, Rol i Àmbit",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "8. Per què s'utilitzen les Managed Identities (Identitats Administrades) a Azure?",
        "opcions": [
            "a) Per sincronitzar els usuaris locals amb el núvol.",
            "b) Per donar una identitat autònoma a recursos (com VMs) i evitar posar contrasenyes al codi font.",
            "c) Per forçar l'autenticació multifactor als administradors globals.",
            "d) Per permetre l'accés d'usuaris convidats d'altres directoris (B2B)."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Evita posar contrasenyes al codi font",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "9. Quina eina cal instal·lar en un entorn local per sincronitzar els comptes i atributs amb Microsoft Entra ID al núvol?",
        "opcions": [
            "a) Azure File Sync",
            "b) Azure Arc",
            "c) ADConnect (Microsoft Entra Connect)",
            "d) Azure VPN Gateway"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Microsoft Entra Connect / ADConnect sincronitza amb el directori local",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "10. Quin servei actua com el motor de directives per prendre decisions automàtiques d'accés (com demanar MFA) segons senyals de risc?",
        "opcions": [
            "a) Accés Condicional (Conditional Access)",
            "b) Azure Policy",
            "c) Network Security Groups (NSG)",
            "d) Azure Role-Based Access Control"
        ],
        "respostaCorrecta": 0,
        "justificacio": "Accés Condicional pren les decisions segons senyals de risc",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "11. Estàs dissenyant un procés per lots (batch) que pot ser interromput sense conseqüències i vols minimitzar costos. Quina opció de computació tries?",
        "opcions": [
            "a) Instàncies Reservades a 3 anys",
            "b) Azure Dedicated Host",
            "c) Màquines Virtuals de pagament per ús",
            "d) Instàncies Spot"
        ],
        "respostaCorrecta": 3,
        "justificacio": "Spot ofereix fins al 90% per càrregues intermitents no crítiques",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "12. Quina és la característica clau de la facturació d'Azure Functions (Serverless)?",
        "opcions": [
            "a) Es factura mensualment una tarifa plana.",
            "b) Es factura únicament durant el temps estricte d'execució del codi.",
            "c) Es factura pel temps que la subscripció està activa, s'executi o no el codi.",
            "d) Requereix reservar capacitat prèviament per reduir costos."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Serverless només factura el temps estricte d'execució",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "13. Quin servei proporciona una connexió dedicada i privada entre la infraestructura local i Azure sense passar per l'Internet públic?",
        "opcions": [
            "a) VPN Site-to-Site",
            "b) Azure Application Gateway",
            "c) Azure ExpressRoute",
            "d) Azure Traffic Manager"
        ],
        "respostaCorrecta": 2,
        "justificacio": "ExpressRoute no passa per internet públic",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "14. Si necessites un balancejador de càrrega global basat en DNS que no obri ports directament a Internet, quin servei utilitzaràs?",
        "opcions": [
            "a) Azure Load Balancer",
            "b) Application Gateway",
            "c) Azure Traffic Manager",
            "d) Azure Firewall"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Traffic Manager és balanç per DNS i no obre ports",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "15. En l'emmagatzematge d'Azure, quina redundància protegeix contra la caiguda completa d'un centre de dades (falla zonal) mantenint les dades a la mateixa regió?",
        "opcions": [
            "a) LRS (Locally Redundant Storage)",
            "b) ZRS (Zone-Redundant Storage)",
            "c) GRS (Geo-Redundant Storage)",
            "d) RA-GRS (Read-Access Geo-Redundant Storage)"
        ],
        "respostaCorrecta": 1,
        "justificacio": "ZRS distribueix en múltiples zones dins de la mateixa regió",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "16. Quin tipus de Blob està dissenyat específicament per oferir una latència molt baixa ideal per a discos de Màquines Virtuals?",
        "opcions": [
            "a) Premium Block Blobs",
            "b) Azure Files",
            "c) Premium Page Blobs",
            "d) Archive Blobs"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Page Blobs per a discos VMs",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "17. Com s'anomena la unitat mínima de desplegament a Azure Kubernetes Service (AKS) que allotja un o més contenidors?",
        "opcions": [
            "a) Node",
            "b) Pod",
            "c) Cluster",
            "d) Registry"
        ],
        "respostaCorrecta": 1,
        "justificacio": "El Pod és la unitat mínima d'AKS",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "18. Per accedir remotament de manera ràpida i segura a arxius compartits en la xarxa sense necessitat d'una VPN clàssica, quin protocol d'Azure Files es pot utilitzar?",
        "opcions": [
            "a) FTP sobre SSL",
            "b) SMB sobre QUIC",
            "c) HTTP/2",
            "d) NFS v3 exclusivament"
        ],
        "respostaCorrecta": 1,
        "justificacio": "SMB sobre QUIC per a Azure Files permet un accés remot ràpid i segur",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "19. Quin component actua com a repositori privat al núvol de Microsoft per emmagatzemar imatges de Docker de manera segura?",
        "opcions": [
            "a) Azure Container Instances (ACI)",
            "b) Azure Kubernetes Service (AKS)",
            "c) Azure Container Registry (ACR)",
            "d) Azure Blob Storage"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Azure Container Registry",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "20. En l'arquitectura de xarxa, què s'utilitza per connectar dues VNets de forma privada a través de la xarxa d'Azure sense sortir a Internet?",
        "opcions": [
            "a) ExpressRoute",
            "b) VNet Peering",
            "c) Azure Firewall",
            "d) Application Security Groups"
        ],
        "respostaCorrecta": 1,
        "justificacio": "VNet Peering connecta VNets per xarxa privada",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "21. Quina eina de l'ecosistema d'Azure s'enfoca exclusivament a analitzar en temps real el rendiment, la usabilitat i els errors del codi d'aplicacions web?",
        "opcions": [
            "a) Log Analytics",
            "b) Application Insights",
            "c) Azure Service Health",
            "d) Azure Network Watcher"
        ],
        "respostaCorrecta": 1,
        "justificacio": "Application Insights / APM",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "22. Quin llenguatge de consulta s'utilitza específicament per analitzar volums immensos de dades de registres a Log Analytics?",
        "opcions": [
            "a) SQL",
            "b) T-SQL",
            "c) KQL (Kusto Query Language)",
            "d) PowerShell"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Kusto Query Language per a Log Analytics",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "23. Quina eina central recopila telemetria i estat de l'entorn, sent la peça clau per a l'auditoria i supervisió a Azure, tot i no estar dissenyada per a l'optimització de costos?",
        "opcions": [
            "a) Azure Monitor",
            "b) Azure Cost Management",
            "c) Azure Advisor",
            "d) Azure Policy"
        ],
        "respostaCorrecta": 0,
        "justificacio": "Azure Monitor audita però no optimitza costos de base",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "24. Si necessites rebre notificacions sobre incidents generals que afecten la infraestructura global de Microsoft Azure o manteniments programats, on ho consultaràs?",
        "opcions": [
            "a) Azure Monitor Alerts",
            "b) Azure Advisor",
            "c) Azure Service Health",
            "d) Log Analytics Workspace"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Azure Service Health notifica de l'estat global de la plataforma",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "25. Quin servei actua com un consultor gratuït revisant l'entorn per identificar recursos infrautilitzats i emetre recomanacions per optimitzar costos i seguretat?",
        "opcions": [
            "a) Cost Management",
            "b) Calculadora TCO",
            "c) Azure Monitor",
            "d) Azure Advisor"
        ],
        "respostaCorrecta": 3,
        "justificacio": "Azure Advisor analitza i recomana",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "26. Quin servei \"serverless\" s'utilitza típicament en arquitectures orientades a esdeveniments (Event- driven) per enrutar i integrar aplicacions via missatges en temps real?",
        "opcions": [
            "a) Azure Traffic Manager",
            "b) Azure Event Grid",
            "c) Azure Load Balancer",
            "d) Azure Arc"
        ],
        "respostaCorrecta": 1,
        "justificacio": "Event Grid enruta missatges/esdeveniments",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "27. Quin servei permet la gestió unificada estenent les capacitats d'Azure cap a instal·lacions locals (on-premise) o altres núvols des d'una única interfície?",
        "opcions": [
            "a) Azure Arc",
            "b) Azure ExpressRoute",
            "c) Azure Blueprints",
            "d) VPN Gateway"
        ],
        "respostaCorrecta": 0,
        "justificacio": "Azure Arc estén la governança als entorns on-prem",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "28. Quin és el propòsit principal de les plantilles ARM (Azure Resource Manager)?",
        "opcions": [
            "a) Gestionar la facturació mensual de les subscripcions.",
            "b) Definir i desplegar conjunts de recursos de manera automàtica, programàtica (JSON) i repetible.",
            "c) Evitar atacs de denegació de servei (DDoS).",
            "d) Sincronitzar usuaris de l'Active Directory."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Definició d'Infraestructura com a codi amb JSON",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "29. Quina solució va \"més enllà\" de les plantilles ARM empaquetant-les juntament amb regles RBAC i Polítiques per garantir Landing Zones totalment estandarditzades des del principi?",
        "opcions": [
            "a) Azure Policy",
            "b) Azure DevOps",
            "c) Azure Blueprints",
            "d) Terraform Workspace"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Azure Blueprints predefineix entorns i normes estandarditzades",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "30. Quin entorn integrat al navegador permet executar scripts (PowerShell Core o Bash) contra els recursos d'Azure sense necessitat d'instal·lar cap programari local?",
        "opcions": [
            "a) Azure CLI on Windows",
            "b) Azure Cloud Shell",
            "c) Azure Arc Terminal",
            "d) Log Analytics Console"
        ],
        "respostaCorrecta": 1,
        "justificacio": "Azure Cloud Shell funciona des del navegador web",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "31. Quina és la funcionalitat principal d'un sistema RAG (Retrieval-Augmented Generation)?",
        "opcions": [
            "a) Entrenar des de zero un model GPT amb dades genèriques d'Internet.",
            "b) Connectar el model de llenguatge a una base de coneixement privada prèviament per enriquir la instrucció i generar respostes basades exclusivament en dades reals.",
            "c) Augmentar la velocitat de resposta de les màquines virtuals.",
            "d) Traduir automàticament codi de Terraform a plantilles ARM."
        ],
        "respostaCorrecta": 1,
        "justificacio": "RAG connecta el model a coneixement privat per respondre de dades reals",
        "tema": "6. IA"
    },
    {
        "pregunta": "32. Quina plataforma integral (PaaS) s'utilitza a Azure per dissenyar, avaluar, orquestrar sistemes RAG i gestionar el cicle de vida de models multi-proveïdor (no només d'OpenAI)?",
        "opcions": [
            "a) Azure Cognitive Services",
            "b) Azure AI Foundry (anteriorment AI Studio)",
            "c) Azure Machine Learning Workspace",
            "d) Azure OpenAI Service"
        ],
        "respostaCorrecta": 1,
        "justificacio": "AI Foundry és la plataforma per cicle de vida i sistemes RAG",
        "tema": "6. IA"
    },
    {
        "pregunta": "33. Quin dels següents beneficis NO és característic d'utilitzar Azure OpenAI per a la IA Generativa corporativa?",
        "opcions": [
            "a) Utilitzar les dades privades de l'empresa per reentrenar els models públics fundacionals de manera oberta.",
            "b) Garantir la privacitat i l'aïllament de les dades segons els estàndards empresarials.",
            "c) Accés directe a models avançats com GPT a través de REST APIs i SDKs.",
            "d) Compliment de les normatives de seguretat del núvol de Microsoft."
        ],
        "respostaCorrecta": 0,
        "justificacio": "Les dades privades MAI s'utilitzen per reentrenar els models públics fundacionals a Azure",
        "tema": "6. IA"
    },
    {
        "pregunta": "34. A quin sector està adreçat de manera completament aïllada i exclusiva l'Azure Government Cloud?",
        "opcions": [
            "a) Al sector bancari i financer europeu exclusivament.",
            "b) A les grans corporacions multinacionals tecnològiques.",
            "c) Al sector governamental (ens públics), operat exclusivament per personal amb autoritzacions especials i estrictes de seguretat.",
            "d) A les universitats i centres de recerca d'intel·ligència artificial."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Aïllament exclusiu per al sector públic amb personal autoritzat",
        "tema": "6. IA"
    },
    {
        "pregunta": "35. A quina eina de seguretat es refereix l'estratègia de restringir explícitament la creació de certs tipus de recursos dins d'un grup (ex: prohibir crear VMs fora d'Europa)?",
        "opcions": [
            "a) RBAC (Control d'Accés Basat en Rols)",
            "b) Network Security Groups (NSG)",
            "c) Bloquejos de recursos (Locks)",
            "d) Azure Policy"
        ],
        "respostaCorrecta": 3,
        "justificacio": "Azure Policy prohibeix i força el compliment",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "36. Quina és la funció exclusiva dels Bloquejos de Recursos (Locks) a Azure?",
        "opcions": [
            "a) Limitar granularment qui pot veure un recurs.",
            "b) Encriptar les dades en repòs.",
            "c) Evitar que els recursos ja creats s'eliminin o es modifiquin accidentalment.",
            "d) Denegar el trànsit HTTP provinent d'Internet."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Locks eviten eliminacions o modificacions",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "37. Quin component d'arquitectura és de caràcter obligatori per segregar de manera estricta, aïllar de les aplicacions i rotar certificats i secrets corporatius?",
        "opcions": [
            "a) Azure Key Vault",
            "b) Azure Storage Account (Nivell Archive)",
            "c) Microsoft Entra ID",
            "d) Azure Firewall"
        ],
        "respostaCorrecta": 0,
        "justificacio": "Key Vault segrega secrets i certificats",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "38. En l'avaluació de regles dels Network Security Groups (NSG), com funciona la prioritat?",
        "opcions": [
            "a) S'avalua primer el número més alt (ex: 1000 abans que 100).",
            "b) Les regles de denegació sempre s'avaluen abans que les de permissió independentment del número.",
            "c) S'avalua primer el número més baix, indicant la prioritat més alta (ex: 100 s'avalua abans que 200).",
            "d) S'avaluen de forma completament aleatòria fins a trobar una coincidència."
        ],
        "respostaCorrecta": 2,
        "justificacio": "El número més baix indica prioritat més alta, ex: 100 abans que 200",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "39. Quin servei actua com la plataforma nativa dedicada a proporcionar avaluacions contínues, detecció avançada d'amenaces i una puntuació de seguretat (security score) per als recursos al núvol?",
        "opcions": [
            "a) Azure Service Health",
            "b) Microsoft Defender for Cloud",
            "c) Azure Bastion",
            "d) Azure DDoS Protection"
        ],
        "respostaCorrecta": 1,
        "justificacio": "Microsoft Defender for Cloud",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "40. Quin tipus de punt de connexió (endpoint) ofereix una connexió completament privada utilitzant una IP de la teva subxarxa local i permetent deshabilitar completament l'accés públic al servei?",
        "opcions": [
            "a) Service Endpoint",
            "b) Public Endpoint",
            "c) Private Endpoint",
            "d) Global Endpoint"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Private Endpoints utilitzen IP de la subxarxa local",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "41. A quina capa jeràrquica s'assigna tradicionalment el límit de facturació i aïllament d'un projecte o entorn?",
        "opcions": [
            "a) Al Grup de Recursos (Resource Group)",
            "b) A la Subscripció (Subscription)",
            "c) Al Grup d'Administració (Management Group)",
            "d) A l'Inquilí global (Tenant)"
        ],
        "respostaCorrecta": 1,
        "justificacio": "La facturació es realitza per subscripció",
        "tema": "8. Governança"
    },
    {
        "pregunta": "42. Quina afirmació és CORRECTA respecte a les Etiquetes (Tags) a Azure?",
        "opcions": [
            "a) S'hereten automàticament des de la Subscripció a tots els recursos inferiors de manera nativa.",
            "b) S'hereten automàticament des del Grup de Recursos als recursos individuals interiors.",
            "c) NO s'hereten automàticament; cadascun ha de ser etiquetat explícitament.",
            "d) Les etiquetes només es poden afegir un cop creat el recurs mitjançant PowerShell."
        ],
        "respostaCorrecta": 2,
        "justificacio": "NO s'hereten automàticament, s'etiqueten recurs per recurs",
        "tema": "8. Governança"
    },
    {
        "pregunta": "43. Quina és la funció d'un Grup d'Administració (Management Group)?",
        "opcions": [
            "a) Organitzar recursos dins d'una sola subscripció per simplificar la xarxa.",
            "b) Agrupar usuaris de Microsoft Entra ID per atorgar llicències d'Office 365.",
            "c) Aplicar regles (polítiques, RBAC) de manera jeràrquica i unificada a múltiples subscripcions alhora.",
            "d) Reduir directament els costos de computació unificant factures."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Management Groups apliquen regles jeràrquiques a múltiples subscripcions",
        "tema": "8. Governança"
    },
    {
        "pregunta": "44. Quina eina usaràs per monitorar diàriament l'evolució de la teva despesa, desglossar els costos per departament i establir límits que disparin alertes automàtiques?",
        "opcions": [
            "a) Azure Pricing Calculator",
            "b) Calculadora TCO",
            "c) Azure Cost Management",
            "d) Azure Log Analytics"
        ],
        "respostaCorrecta": 2,
        "justificacio": "Cost Management monitoritza consum en curs",
        "tema": "8. Governança"
    },
    {
        "pregunta": "45. Com es denominen els acords contractuals d'1 o 3 anys que permeten reduir dràsticament el cost de computació de les Màquines Virtuals d'ús continu a canvi de compromís de pagament?",
        "opcions": [
            "a) Azure Spot Instances",
            "b) Azure Pay-As-You-Go",
            "c) Azure Dedicated Hosts",
            "d) Instàncies Reservades (Azure Reserved Instances)"
        ],
        "respostaCorrecta": 3,
        "justificacio": "Instàncies reservades d'1 a 3 anys",
        "tema": "8. Governança"
    },
    {
        "pregunta": "46. Dins del model IaaS, sobre quin d'aquests elements la Diputació de Barcelona (com a client) NO en té la responsabilitat de gestió?",
        "opcions": [
            "a) Sistema Operatiu",
            "b) Maquinari físic (Host físic i centre de dades)",
            "c) Aplicacions",
            "d) Pegats de seguretat del SO"
        ],
        "respostaCorrecta": 1,
        "justificacio": "Microsoft sempre gestiona el maquinari físic",
        "tema": "8. Governança"
    },
    {
        "pregunta": "47. Si estàs dissenyant un sistema de recuperació davant desastres (Disaster Recovery), quina característica de la infraestructura d'Azure resulta essencial per garantir resiliència en cas d'un sisme que destrueixi una regió sencera?",
        "opcions": [
            "a) Zones de disponibilitat (Availability Zones)",
            "b) Pares de Regions (Region Pairs)",
            "c) Subxarxes",
            "d) VNet Peering local"
        ],
        "respostaCorrecta": 1,
        "justificacio": "Pares de Regions / Region Pairs protegeixen contra fallades regionals senceres",
        "tema": "8. Governança"
    },
    {
        "pregunta": "48. Quina d'aquestes declaracions defineix millor l'acció d'aplicar el principi del \"Mínim Privilegi\" utilitzant RBAC?",
        "opcions": [
            "a) Atorgar permisos de \"Contributor\" (Col·laborador) a l'àmbit de la Subscripció a tots els desenvolupadors.",
            "b) Crear un rol personalitzat només de \"Lectura\" assignat estrictament a l'àmbit d'una base de dades específica per a l'auditor.",
            "c) Permetre que només el responsable del departament configuri el Microsoft Entra Connect.",
            "d) Restringir l'ús d'identitats administrades per forçar l'ús de certificats manuals."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Rol específic a un recurs molt concret",
        "tema": "8. Governança"
    },
    {
        "pregunta": "49. Estàs integrant un directori actiu local amb Azure. Quin és el flux de dades principal que gestiona Microsoft Entra Connect?",
        "opcions": [
            "a) De les Màquines Virtuals d'Azure a l'emmagatzematge local de Logs.",
            "b) Dels dominis de xarxa d'Azure Firewall a l'encaminador físic local.",
            "c) Dels comptes i atributs de l'Active Directory on-premise al Microsoft Entra ID al núvol.",
            "d) Des dels Grups de Seguretat de Xarxa (NSG) a les Polítiques d'Azure."
        ],
        "respostaCorrecta": 2,
        "justificacio": "De l'AD local al núvol",
        "tema": "8. Governança"
    },
    {
        "pregunta": "50. En el control de pressupostos d'Azure, els costos per amplada de banda consumida destaquen perquè:",
        "opcions": [
            "a) Totes les transferències de dades (entrants i sortints) són sempre gratuïtes.",
            "b) Les transferències de dades entrants solen ser gratuïtes, però les sortints cap a Internet tenen cost.",
            "c) Les transferències de dades entrants tenen alt cost, mentre que les sortints són gratuïtes.",
            "d) Només es factura el trànsit entre màquines de la mateixa VNet."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Transferències sortints solen generar facturació",
        "tema": "8. Governança"
    },
    {
        "pregunta": "51. Segons l'arquitectura cloud, què entenem per \"Economia d'escala\"?",
        "opcions": [
            "a) La capacitat de desplegar recursos globals en minuts.",
            "b) El principi basat en la reducció de costos unitaris mitjançant la producció o operació a gran escala dels grans proveïdors.",
            "c) La transformació de la despesa operativa en despesa de capital.",
            "d) L 'assignació dinàmica de recursos segons la càrrega de treball."
        ],
        "respostaCorrecta": 1,
        "justificacio": "L 'economia d'escala redueix el cost unitari per produir a grans quantitats",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "52. En un model Cloud Híbrid, quina és la característica principal?",
        "opcions": [
            "a) L 'arquitectura és propietat exclusiva d'un proveïdor extern.",
            "b) Els recursos s'utilitzen de manera exclusiva per una sola organització en centres propis.",
            "c) Es combinen components d'instal·lacions pròpies (on-premise) i recursos del cloud públic, permetent moure dades i aplicacions entre ells.",
            "d) Microsoft gestiona l'Active Directory local."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'entorn híbrid combina el cloud públic amb instal·lacions on-premise privades",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "53. Dins les característiques del Cloud Computing, què significa l'Agrupació de recursos (Multitenancy)?",
        "opcions": [
            "a) Registre del consum exacte de CPU i RAM.",
            "b) La capacitat física del proveïdor es comparteix entre diversos clients (inquilins) de manera aïllada, eficient i segura.",
            "c) Provisionar infraestructura amb pocs clics.",
            "d) La infraestructura és accessible globalment via internet."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Multitenancy: compartir de forma aïllada i segura infraestructures de MS",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "54. Quin tipus de servei al núvol elimina per complet la gestió del Sistema Operatiu i servidors, permetent als desenvolupadors centrar-se només en el codi?",
        "opcions": [
            "a) SaaS.",
            "b) IaaS.",
            "c) PaaS.",
            "d) DaaS."
        ],
        "respostaCorrecta": 2,
        "justificacio": "En el PaaS, la gestió de servidors s'elimina i et centres en el desenvolupament",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "55. En el model de responsabilitat compartida, quina tasca és SEMPRE responsabilitat de Microsoft Azure independentment del model (IaaS, PaaS, SaaS)?",
        "opcions": [
            "a) La seguretat de les dades.",
            "b) La gestió d'identitats.",
            "c) L 'administració del sistema operatiu.",
            "d) La gestió de la infraestructura física (centres de dades, xarxa física i hosts)."
        ],
        "respostaCorrecta": 3,
        "justificacio": "MS gestiona la infraestructura física i de xarxa SEMPRE",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "56. Quin és el concepte central a Microsoft Entra ID que funciona com una instància dedicada per a cada organització?",
        "opcions": [
            "a) La Subscripció.",
            "b) El Grup de Recursos.",
            "c) L 'Inquilí (Tenant).",
            "d) L 'Àmbit (Scope)."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'Inquilí/Tenant és l'entitat representativa dedicada a cada organització",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "57. A quins tipus de recursos s'atorga una \"Identitat Administrada\" (Managed Identity) per evitar emmagatzemar contrasenyes al codi font?",
        "opcions": [
            "a) A usuaris convidats B2B.",
            "b) A recursos de computació d'Azure, com Màquines Virtuals o aplicacions.",
            "c) Exclusivament a Bases de Dades.",
            "d) A administradors globals del Tenant."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Perquè un recurs com una VM s'autentiqui contra AD sense guardar passwords",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "58. Dins del Control d'Accés Basat en Rols (RBAC), què defineix l'\"Àmbit\" (Scope)?",
        "opcions": [
            "a) El conjunt exacte de recursos on s'aplicarà l'assignació de control d'accés.",
            "b) Les accions concretes que l'entitat pot realitzar (lectura, escriptura).",
            "c) L 'usuari, grup o servei que realitzarà les accions.",
            "d) El requisit de demanar MFA."
        ],
        "respostaCorrecta": 0,
        "justificacio": "L 'àmbit / scope indica a quins recursos concrets aplica el rol",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "59. Què avalua principalment la Política d'Accés Condicional a Azure?",
        "opcions": [
            "a) L 'etiquetatge obligatori dels recursos.",
            "b) Senyals de risc com la ubicació o el dispositiu per decidir si bloqueja l'accés, el concedeix o demana MFA.",
            "c) El cost consumit per un departament.",
            "d) La sincronització d'usuaris des de l'entorn on-premise."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Bloqueja o demana MFA en funció d'on o des d'on s'intenta accedir",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "60. Segons el temari, per què Microsoft Entra ID requereix habilitats d'administració diferents respecte a l'Active Directory local?",
        "opcions": [
            "a) Perquè no suporta control d'accés.",
            "b) Perquè està dissenyat específicament per a la informàtica al núvol i ofereix funcionalitats per a aplicacions web i mòbils.",
            "c) Perquè només permet l'accés des de dispositius Windows.",
            "d) Perquè utilitza el protocol SMB de manera predeterminada."
        ],
        "respostaCorrecta": 1,
        "justificacio": "El funcionament d'Entra ID per a web/cloud és molt diferent de l'AD clàssic local",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "61. Estàs dissenyant una arquitectura web on l'escalat, el maquinari i el sistema operatiu han de ser gestionats automàticament per Azure, permetent allotjar codi lliurement. Quin servei esculls?",
        "opcions": [
            "a) Azure Virtual Machines.",
            "b) Azure Kubernetes Service.",
            "c) Azure App Service.",
            "d) Azure Blob Storage."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'App Service (PaaS",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "62. Quin equilibrador de càrrega d'Azure opera a la capa 7 (aplicació) i permet redirigir trànsit basant- se en la URL de destinació?",
        "opcions": [
            "a) Azure Load Balancer.",
            "b) Azure Application Gateway.",
            "c) Azure VPN Gateway.",
            "d) Azure Traffic Manager."
        ],
        "respostaCorrecta": 1,
        "justificacio": "L 'Application Gateway és capa 7, basat en rutes i URL",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "63. Quin servei de dades s'utilitza idealment per emmagatzemar registres (logs) i auditories que s'afegeixen contínuament sense necessitat de sobreescriure informació?",
        "opcions": [
            "a) Azure Table Storage.",
            "b) Blob de pàgina (Page Blob).",
            "c) Blob de blocs (Block Blob).",
            "d) Blob annex (Append Blob)."
        ],
        "respostaCorrecta": 3,
        "justificacio": "Els Append Blobs estan optimitzats per anar afegint informació (logs",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "64. En l'orquestració de contenidors amb AKS, on s'allotgen físicament els \"Pods\"?",
        "opcions": [
            "a) Dins d'un Azure Container Registry.",
            "b) Dins dels Nodes (Nodos).",
            "c) A les Màquines Virtuals aïllades.",
            "d) Dins dels Blob Storage."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Els contenidors a Kubernetes corren dins de Pods, i els Pods dins dels Nodos",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "65. Si configures un emmagatzematge amb el nivell d'accés (Access Tier) \"Cold\" (Access esporàdic), per a quin cas d'ús està dissenyat?",
        "opcions": [
            "a) Per a dades d'accés diari i freqüent.",
            "b) Per a retenció a llarg termini i compliment legal, on la recuperació triga hores.",
            "c) Per a dades consultades excepcionalment (1-2 cops l'any) amb un cost molt baix de retenció.",
            "d) Per a dades que es llegeixen múltiples vegades al dia però mai s'escriuen."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Cold està dissenyat per a accessos molt rars però amb requeriment de rapidesa menor a Archive",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "66. La redundància ZRS (Zone-Redundant Storage) garanteix la protecció de dades escrivint de manera síncrona:",
        "opcions": [
            "a) 3 còpies a la mateixa zona de disponibilitat.",
            "b) 3 còpies distribuïdes en diferents zones dins de la mateixa regió.",
            "c) Còpies en una regió primària i una regió secundària.",
            "d) 6 còpies globalment."
        ],
        "respostaCorrecta": 1,
        "justificacio": "ZRS fa les 3 còpies en diferents centres físics dins de la mateixa regió",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "67. Quin servei s'utilitza a Azure per virtualitzar escriptoris i aplicacions al núvol amb experiència optimitzada per a Office 365?",
        "opcions": [
            "a) Azure Bastion.",
            "b) Azure Virtual Desktop.",
            "c) Azure App Service.",
            "d) Azure Cloud Shell."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Azure Virtual Desktop és el VDI oficial al núvol d'Azure",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "68. Una de les condicions d'ús de les Màquines Virtuals (VM) a Azure és que:",
        "opcions": [
            "a) Es facturen únicament quan l'usuari interactua amb el sistema operatiu.",
            "b) Es facturen pel temps que estan en execució encara que no es facin servir activament.",
            "c) Totes exigeixen un compromís de pagament de 3 anys per ser desplegades.",
            "d) La sortida de dades a internet des de les VMs és sempre gratuïta."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Mentre la VM no estigui desassignada (Deallocated",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "69. Quin servei d'Azure utilitza intel·ligència artificial per analitzar proactivament el rendiment de la infraestructura i pot automatitzar respostes davant esdeveniments?",
        "opcions": [
            "a) Azure Service Health.",
            "b) Log Analytics.",
            "c) Azure Monitor.",
            "d) Cost Management."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'Azure Monitor té IA i accions automàtiques per auditar",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "70. Per a què s'utilitza exactament Azure Service Health?",
        "opcions": [
            "a) Per optimitzar els costos de màquines virtuals inactives.",
            "b) Per monitoritzar exclusivament aplicacions web en temps real.",
            "c) Per mantenir l'usuari informat sobre l'estat global de la plataforma, avisant d'incidents generals i manteniment programat.",
            "d) Per rebre alertes sobre límits de pressupost consumit."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Avisa d'avaries en regions d'Azure o manteniment d'estat global",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "71. Application Insights destaca dins l'ecosistema de monitoratge perquè:",
        "opcions": [
            "a) S'utilitza per consultar grans bases de dades amb llenguatge KQL.",
            "b) És l'eina de Gestió del Rendiment d'Aplicacions (APM) enfocada exclusivament a aplicacions web.",
            "c) Revisa l'entorn per donar recomanacions gratuïtes de seguretat.",
            "d) Manté l'auditoria dels permisos RBAC."
        ],
        "respostaCorrecta": 1,
        "justificacio": "App Insights és la branca de monitoratge exclusiva del codi/aplicacions (APM",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "72. Quin d'aquests serveis PaaS porta el monitoratge de l'estat de l'aplicació ja integrat de sèrie, sense haver de configurar res addicional?",
        "opcions": [
            "a) Azure Virtual Machines (IaaS).",
            "b) Azure Dedicated Host.",
            "c) Azure App Service.",
            "d) ExpressRoute."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'App Service, en ser PaaS, inclou monitoratge natiu a la plataforma",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "73. A l'hora d'implementar un patró d'arquitectura orientada a esdeveniments (Event-driven), quin servei d'Azure actua com a execució de codi sota demanda iniciada exclusivament per un \"trigger\"?",
        "opcions": [
            "a) Azure Container Registry.",
            "b) Azure Functions.",
            "c) Azure Queue Storage.",
            "d) Terraform."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Les Azure Functions s'executen via Triggers (esdeveniments",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "74. L 'arquitectura \"Hub & Spoke\" (Centre i Ràdis) és fonamental principalment per a:",
        "opcions": [
            "a) El disseny eficient i segmentat de Xarxes (VNet).",
            "b) La configuració d'Azure Active Directory.",
            "c) L 'emmagatzematge de blobs.",
            "d) La generació de codi amb IA."
        ],
        "respostaCorrecta": 0,
        "justificacio": "Per dissenyar VNETs centrals interconnectades amb subxarxes perimetrals",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "75. A què es refereix el concepte d'Infraestructura com a Codi (IaaC)?",
        "opcions": [
            "a) Al procés d'escriure codi font directament en Azure Functions.",
            "b) A la construcció i definició d'infraestructura (xarxes, serveis) de manera programàtica i automàtica utilitzant plantilles com ARM o Terraform.",
            "c) Al desenvolupament d'APIs complexes utilitzant exclusivament Java o C#.",
            "d) A l'ús obligatori de contenidors Docker per a tota aplicació."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Automatització via JSON, ARM o Terraform",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "76. Quin servei permet gestionar de manera unificada recursos d'Azure i recursos d'instal·lacions pròpies (on-premise) des d'una mateixa interfície?",
        "opcions": [
            "a) Microsoft Entra Connect.",
            "b) Azure Blueprints.",
            "c) Azure Arc.",
            "d) Azure File Sync."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'Azure Arc fa de \"pont\" per gestionar l'On-Premise des del portal d'Azure",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "77. Quin ús principal té el servei Azure Queue Storage dins d'una arquitectura de solucions?",
        "opcions": [
            "a) Proporcionar un sistema d'arxius compartits en xarxa via SMB.",
            "b) Emmagatzemar bases de dades relacionals SQL.",
            "c) Oferir cues escalables i asíncrones per a la comunicació entre microserveis.",
            "d) Lliurar contingut global amb baixa latència (CDN)."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Cues asíncrones per evitar col·lapses entre microserveis",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "78. Azure OpenAI Service proporciona accés segur a models fundacionals com GPT. Quina característica destaca en el seu ús empresarial a Azure?",
        "opcions": [
            "a) Els usuaris finals han d'entrenar l'algoritme de Machine Learning des de zero.",
            "b) Manté tota la seguretat, la privacitat i les garanties empresarials d'Azure sense utilitzar les dades del client per entrenar els models públics.",
            "c) Només es pot utilitzar a través d'Azure Cloud Shell i no suporta REST APIs.",
            "d) Substitueix per complet la necessitat d'utilitzar bases de dades relacionals."
        ],
        "respostaCorrecta": 1,
        "justificacio": "És segur: la Diputació tindrà la potència de GPT sense compartir dades",
        "tema": "6. IA"
    },
    {
        "pregunta": "79. Què diferencia Azure AI Foundry d'Azure OpenAI?",
        "opcions": [
            "a) AI Foundry només permet utilitzar models antics.",
            "b) AI Foundry actua com un \"superconjunt\" on, a més dels models d'OpenAI, permet utilitzar models d'altres proveïdors (Llama, Mistral) i orquestrar sistemes complexos com RAG.",
            "c) OpenAI és PaaS i AI Foundry és exclusivament IaaS.",
            "d) AI Foundry no disposa d'eines de governança."
        ],
        "respostaCorrecta": 1,
        "justificacio": "L 'AI Foundry és multimodels i permet orquestrar tot el procés RAG",
        "tema": "6. IA"
    },
    {
        "pregunta": "80. L 'Azure Government Cloud està dissenyat exclusivament per a:",
        "opcions": [
            "a) Grans empreses de la llista Fortune 500.",
            "b) Organitzacions de recerca mèdica privades.",
            "c) El sector governamental, mantenint el màxim aïllament, sobirania de dades i sent operat només per personal autoritzat.",
            "d) Sistemes educatius públics únicament per a estudiants de secundària."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Aïllament físic extrem, només per a governs",
        "tema": "6. IA"
    },
    {
        "pregunta": "81. A què ens referim amb l'enfocament de seguretat de \"Defensa en Profunditat\"?",
        "opcions": [
            "a) Una estratègia on tota la seguretat recau exclusivament en la protecció de xarxa perimetral.",
            "b) Una estratègia multicapa (física, identitat, xarxa, aplicació, dades) on si una capa falla, la següent continua protegint l'entorn.",
            "c) La política que exigeix l'ús de Private Endpoints per a tot.",
            "d) El model que delega la seguretat exclusivament a Microsoft."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Multi-capa: xarxa, identitat, dades... per frenar atacs si un nivell cau",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "82. Quina eina usaràs a Azure per garantir explícitament que no es puguin desplegar recursos de màquines virtuals sense una etiqueta obligatòria (tag)?",
        "opcions": [
            "a) Azure Policy.",
            "b) RBAC.",
            "c) Locks (Bloquejos).",
            "d) Microsoft Defender for Cloud."
        ],
        "respostaCorrecta": 0,
        "justificacio": "Azure Policy dicta accions prohibides o obligades de forma corporativa",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "83. Quin tipus de \"Lock\" (Candado) s'ha d'aplicar si vols que els usuaris puguin llegir i modificar un recurs, però evitar categòricament que el puguin esborrar?",
        "opcions": [
            "a) Read-only lock.",
            "b) Delete lock.",
            "c) Write-only lock.",
            "d) Resource Management lock."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Un Delete lock permet l'edició i lectura, però no l'eliminació",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "84. L 'Azure Key Vault és un servei fonamental dissenyat específicament per a:",
        "opcions": [
            "a) Xifrar trànsit de xarxa mitjançant VPN.",
            "b) Emmagatzemar dades no estructurades a llarg termini.",
            "c) Aïllar, segregar i emmagatzemar de forma totalment segura secrets, claus i certificats.",
            "d) Protegir contra atacs de denegació de servei (DDoS)."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Emmagatzematge hiper-segur per contrasenyes, certificats i secrets",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "85. Quin és el mètode recomanat com a millor pràctica per permetre la comunicació privada entre instal·lacions locals (On-Prem) i un servei PaaS d'Azure, deshabilitant completament l'accés públic al servei?",
        "opcions": [
            "a) Service Endpoint.",
            "b) VPN Point-to-Site sense NSG.",
            "c) Private Endpoint.",
            "d) ExpressRoute Public Peering."
        ],
        "respostaCorrecta": 2,
        "justificacio": "El Private endpoint dona IP local (privada",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "86. Un Network Security Group (NSG) denega per defecte o permet certes connexions basant-se en prioritats. Si tens una regla amb prioritat 100 i una altra amb 200 que es contradiuen, què passa?",
        "opcions": [
            "a) S'executa la de prioritat 200, perquè un número més alt implica més força.",
            "b) S'executa la de prioritat 100, perquè el número més baix indica la prioritat més alta.",
            "c) Les regles es cancel·len mútuament i s'aplica el bloqueig predeterminat.",
            "d) S'apliquen simultàniament creant un bucle de xarxa."
        ],
        "respostaCorrecta": 1,
        "justificacio": "En els NSG, el número més baix és el que governa. 100 s'executa abans",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "87. Quin nivell jeràrquic d'Azure és l'esglaó principal on s'assignen els límits de facturació i s'aïllen econòmicament els projectes?",
        "opcions": [
            "a) Management Group.",
            "b) Azure Tenant.",
            "c) Subscripció (Subscription).",
            "d) Grup de Recursos."
        ],
        "respostaCorrecta": 2,
        "justificacio": "La Subscripció és la unitat financera d'Azure on s'imputen les despeses",
        "tema": "8. Governança"
    },
    {
        "pregunta": "88. La utilització d'etiquetes (Tags) als recursos d'Azure:",
        "opcions": [
            "a) És un requisit obligatori per defecte abans de crear qualsevol recurs.",
            "b) NO s'hereta automàticament des del grup de recursos cap als elements interiors; cal etiquetar de forma explícita.",
            "c) S'aplica de forma jeràrquica a través dels grups d'administració.",
            "d) Afecta el rendiment de la màquina virtual de manera negativa."
        ],
        "respostaCorrecta": 1,
        "justificacio": "No s'hereten mai; una VNET no agafa el TAG del seu grup de recursos automàticament",
        "tema": "8. Governança"
    },
    {
        "pregunta": "89. Estàs planificant el desplegament d'una nova aplicació al núvol i necessites preveure quin en serà el cost mensual ABANS de construir res. Quina eina utilitzaràs?",
        "opcions": [
            "a) Azure Cost Management.",
            "b) Azure Pricing Calculator (Calculadora de preus).",
            "c) Azure Service Health.",
            "d) Log Analytics."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Pricing Calculator s'utilitza abans de l'alta per calcular previsions",
        "tema": "8. Governança"
    },
    {
        "pregunta": "90. El servei \"Azure Cost Management\" serveix per a totes les funcions següents EXCEPTE:",
        "opcions": [
            "a) Monitorar i analitzar els costos reals que s'estan generant.",
            "b) Rastrejar la despesa segmentada per departaments.",
            "c) Establir pressupostos que disparin alertes automàtiques al superar certs llindars.",
            "d) Comparar el cost de manteniment de servidors físics locals davant del pas a Azure."
        ],
        "respostaCorrecta": 3,
        "justificacio": "Comparar preus amb entorn local ho fa la Calculadora TCO, no Cost Management",
        "tema": "8. Governança"
    },
    {
        "pregunta": "91. Què és un \"Management Group\" (Grup d'Administració) a Azure?",
        "opcions": [
            "a) Un grup de seguretat d'Active Directory local sincronitzat.",
            "b) Una estructura jeràrquica dissenyada per aplicar polítiques i RBAC de forma unificada a múltiples subscripcions al mateix temps.",
            "c) Una col·lecció de Màquines Virtuals configurades per balanceig de càrrega.",
            "d) Un límit estricte d'emmagatzematge al disc de les VMs."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Permeten posar normes per \"sobre\" de diverses subscripcions a l'hora",
        "tema": "8. Governança"
    },
    {
        "pregunta": "92. Si necessites sincronitzar arxius de servidors Windows locals (On-Premise) amb el núvol d'Azure perquè els servidors locals actuïn només com a memòria cau ràpida, quina solució implementes?",
        "opcions": [
            "a) Azure Blob Storage Archive.",
            "b) Azure File Sync.",
            "c) Azure Content Delivery Network (CDN).",
            "d) Azure Cosmos DB."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Azure File Sync",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "93. Quin component s'ha d'instal·lar i configurar per assegurar el trànsit xifrat a través d'internet mitjançant un túnel IPsec entre una oficina local i una VNet d'Azure?",
        "opcions": [
            "a) Application Gateway.",
            "b) Azure Firewall.",
            "c) VPN Gateway (Site-to-Site).",
            "d) ExpressRoute."
        ],
        "respostaCorrecta": 2,
        "justificacio": "VPN Gateway per Site-to-Site IPsec",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "94. Quan utilitzem el model SaaS (ex: Microsoft 365), quin d'aquests elements encara hem de gestionar com a clients segons la Responsabilitat Compartida?",
        "opcions": [
            "a) Pegats del sistema operatiu Windows Server.",
            "b) Manteniment de les xarxes físiques de Microsoft.",
            "c) Identitats i comptes d'usuari de la nostra organització.",
            "d) La base de dades i el runtime de l'aplicació."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Tot el que és compte o dades pertany al client",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "95. Tens una VM executant un procés en lot setmanal. Quin d'aquests elements de consum facturarà fins i tot quan la màquina estigui apagada i desassignada?",
        "opcions": [
            "a) El cost de processament (CPU i RAM) per segon de la màquina.",
            "b) El cost d'emmagatzematge del disc virtual (Managed Disk) assignat a la màquina.",
            "c) L 'amplada de banda d'entrada a internet.",
            "d) Les peticions de l'Azure Application Gateway."
        ],
        "respostaCorrecta": 1,
        "justificacio": "La màquina no gasta RAM apagada, però el disc que guarda el SO sí que existeix",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "96. Segons les funcions específiques del teu lloc, el disseny de \"Landing Zones\" implica la utilització d'eines que empaqueten plantilles IaaC, rols i polítiques estandarditzades. A quina eina ens referim?",
        "opcions": [
            "a) Azure Policy exclusivament.",
            "b) Azure Blueprints.",
            "c) Azure Logic Apps.",
            "d) Microsoft Entra ID Conditional Access."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Els Blueprints porten dins les plantilles ARM i les normes Policy+RBAC",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "97. Azure Kubernetes Service (AKS) utilitza l'autoescalat per gestionar eficientment les càrregues. Què escala exactament AKS dinàmicament per adaptar-se?",
        "opcions": [
            "a) Afegeix o redueix Subscripcions al tenant.",
            "b) Ajusta dinàmicament la quantitat de contenidors/Pods actius.",
            "c) Modifica les regles NSG automàticament.",
            "d) Augmenta l'emmagatzematge dels Archive Blobs."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Orquestra els contenidors i pods segons peticions",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "98. Quina afirmació és certa sobre la transferència de dades (Bandwidth) cap a i des d'Azure?",
        "opcions": [
            "a) El trànsit d'entrada i sortida és sempre gratuït.",
            "b) El trànsit entrant (cap a Azure) sol ser gratuït, però la sortida cap a Internet té cost.",
            "c) Només es factura el trànsit entrant cap a les bases de dades.",
            "d) Les connexions ExpressRoute eliminen qualsevol cost de trànsit sortint."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Inbound gratis, Outbound cap a Internet es paga",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "99. El Microsoft Defender for Cloud ofereix una \"Security Score\" (Puntuació de seguretat). Quin n'és l'objectiu principal?",
        "opcions": [
            "a) Avaluar la probabilitat de caiguda física d'un centre de dades de Microsoft.",
            "b) Calcular la despesa projectada en euros del pròxim mes.",
            "c) Proporcionar avaluacions contínues i emetre recomanacions per millorar la postura de seguretat dels recursos.",
            "d) Classificar els usuaris per restringir el seu accés a Azure AD."
        ],
        "respostaCorrecta": 2,
        "justificacio": "És l'indicador global de la postura de seguretat del tenant",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "100. Quina afirmació descriu millor l'ús d'instàncies de Màquines Virtuals \"Spot\" a Azure?",
        "opcions": [
            "a) Serveixen exclusivament per a bases de dades crítiques i de producció.",
            "b) Obliguen a signar un contracte de 3 anys per obtenir descomptes.",
            "c) Ofereixen descomptes de fins al 90% aprofitant la capacitat sobrant, però es poden interrompre i perdre en qualsevol moment, sent ideals per càrregues no crítiques.",
            "d) Són hosts completament dedicats (servidors físics) on només corre la teva organització."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Màquines molt barates però inestables, el sistema les tanca si necessita potència",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "101. Estàs dissenyant un pla de Recuperació davant Desastres (DR). Com a arquitecte, quin concepte defineix \"el temps màxim acceptable que un servei pot estar inactiu després d'una fallada abans de causar un impacte inacceptable\"?",
        "opcions": [
            "a) RPO (Recovery Point Objective).",
            "b) SLA (Service Level Agreement).",
            "c) RTO (Recovery Time Objective).",
            "d) MTBF (Mean Time Between Failures)."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'RTO mesura el \"Temps\" de recuperació, l'RPO la pèrdua de dades",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "102. En una estratègia de migració al núvol, s'ha decidit moure una base de dades local SQL Server directament a Azure SQL Database. Quin model de servei s'està utilitzant?",
        "opcions": [
            "a) IaaS.",
            "b) PaaS.",
            "c) SaaS.",
            "d) DaaS."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Azure SQL Database és PaaS: MS gestiona el motor i els servidors, tu les dades",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "103. Quin d'aquests models financers és el resultat directe d'aplicar un model 100% de pagament per ús (Pay-as-you-go) en Cloud Computing?",
        "opcions": [
            "a) Increment del CAPEX i reducció de l'OPEX.",
            "b) Depreciació dels actius físics a 5 anys.",
            "c) Substitució completa del CAPEX per OPEX.",
            "d) Pagament anticipat obligatori per tot el maquinari."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Es passa d'inversió inicial CAPEX a factura mensual operativa OPEX",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "104. Quin és el límit principal del model SaaS des de la perspectiva d'un Tècnic Superior d'Informàtica?",
        "opcions": [
            "a) L 'usuari ha d'actualitzar el sistema operatiu.",
            "b) S'ofereix molt poc control sobre el codi i la infraestructura subjacent.",
            "c) Requereix instal·lació de programari pesat en servidors locals.",
            "d) No permet integració amb Microsoft Entra ID."
        ],
        "respostaCorrecta": 1,
        "justificacio": "L 'arquitecte no toca la màquina ni el codi, és \"Software as a Service\"",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "105. En què es diferencia principalment el Cloud Públic del Privat pel que fa a la tinença dels recursos?",
        "opcions": [
            "a) El Cloud Públic utilitza hardware completament dedicat a una sola empresa (Single-tenant).",
            "b) El Cloud Privat es basa sempre en el pagament per consum de recursos externs.",
            "c) El Cloud Públic opera sota un model d'agrupació de recursos (Multi-tenancy) on els usuaris comparteixen capacitat física de forma aïllada lògicament.",
            "d) Només el Cloud Privat permet l'accés via VPN."
        ],
        "respostaCorrecta": 2,
        "justificacio": "El Cloud Públic es basa en el \"Multi-tenancy\" - multilloguer",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "106. Si una arquitectura Cloud assigna recursos automàticament a les 09:00 h quan hi ha un pic d'usuaris i els desassigna a les 18:00 h, de quina propietat estem parlant?",
        "opcions": [
            "a) Escalabilitat vertical.",
            "b) Agilitat on-premise.",
            "c) Elasticitat dinàmica.",
            "d) Alta Disponibilitat zonal."
        ],
        "respostaCorrecta": 2,
        "justificacio": "L 'elasticitat és dinàmica: créixer i decréixer segons les necessitats de temps real",
        "tema": "1. Fonaments"
    },
    {
        "pregunta": "107. A Microsoft Entra ID, quina eina avançada s'utilitza per proporcionar \"accés just-in-time\" (JIT) als rols crítics d'Azure, evitant tenir administradors amb privilegis permanents?",
        "opcions": [
            "a) Azure AD Connect.",
            "b) Privileged Identity Management (PIM).",
            "c) Managed Identities.",
            "d) Accés Condicional."
        ],
        "respostaCorrecta": 1,
        "justificacio": "PIM eleva els privilegis només quan es necessiten i durant un temps límit",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "108. Una Identitat Administrada \"Assignada pel Sistema\" (System-assigned Managed Identity) està lligada estretament a un recurs d'Azure (ex: una Màquina Virtual). Què passa amb aquesta identitat si s'elimina la Màquina Virtual?",
        "opcions": [
            "a) La identitat es manté a Entra ID i s'ha d'eliminar manualment.",
            "b) Es reassigna automàticament a una altra màquina del mateix grup de recursos.",
            "c) S'elimina automàticament de Microsoft Entra ID.",
            "d) Es bloqueja temporalment durant 30 dies abans d'esborrar-se."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Si la VM mor, la identitat assignada al sistema mor amb ella",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "109. El teu equip desenvolupa una app per a ciutadans on aquests s'han de registrar amb el seu compte de Google o Facebook. Quina solució de Microsoft Entra està dissenyada per a això?",
        "opcions": [
            "a) Azure AD B2B (Business to Business).",
            "b) Azure AD B2C (Business to Consumer).",
            "c) Microsoft Entra Connect.",
            "d) Azure Active Directory Domain Services."
        ],
        "respostaCorrecta": 1,
        "justificacio": "B2C és Business to Consumer, per identitats socials externes",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "110. A l'hora d'aplicar el Control d'Accés Basat en Rols (RBAC), què passa si un usuari rep el rol de \"Lector\" (Reader) a nivell de Subscripció, però \"Col·laborador\" (Contributor) a nivell d'un Grup de Recursos específic?",
        "opcions": [
            "a) El rol de Lector preval per motius de seguretat.",
            "b) S'aplica la suma de permisos; tindrà accés de lectura a tota la subscripció i accés de col·laborador exclusivament en aquell grup de recursos.",
            "c) El sistema llança un error de conflicte d'assignació.",
            "d) L 'usuari perd tot l'accés fins que l'administrador resolgui el conflicte."
        ],
        "respostaCorrecta": 1,
        "justificacio": "A Azure RBAC els permisos s'acumulen. Sumarà els permisos d'ambdós nivells",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "111. Quina política permet avaluar variables com si l'inici de sessió prové d'una xarxa coneguda, o si el dispositiu compleix amb la normativa corporativa, per decidir si es deixa entrar l'usuari?",
        "opcions": [
            "a) Azure Policy.",
            "b) Accés Condicional (Conditional Access).",
            "c) Network Security Groups.",
            "d) Azure Firewall."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Accés Condicional",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "112. Quina és la raó de ser del principi de \"Zero Trust\"?",
        "opcions": [
            "a) Que els usuaris no puguin canviar les seves contrasenyes ells mateixos.",
            "b) Que els administradors IT no tinguin cap responsabilitat.",
            "c) Assumir que la xarxa corporativa no és segura i exigir verificació constant de la identitat independentment de l'origen de la connexió.",
            "d) Refusar totes les connexions entrants des d'adreces IP no espanyoles."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Mai confiar en cap xarxa i verificar sempre identitat/dispositiu",
        "tema": "2. Identitat i accés"
    },
    {
        "pregunta": "113. Per garantir la màxima seguretat sense obrir el port 22 (SSH) o 3389 (RDP) de les teves VMs a Internet, quin servei PaaS d'Azure pots desplegar per accedir-hi directament des del portal web d'Azure de forma segura?",
        "opcions": [
            "a) Azure Application Gateway.",
            "b) Azure Bastion.",
            "c) VPN Point-to-Site.",
            "d) Azure Traffic Manager."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Azure Bastion permet connectar via RDP/SSH des del navegador sense obrir ports públics",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "114. Configures un VNet Peering (Emparellament) entre VNet-A i VNet-B, i un altre entre VNet-B i VNet- C. Es poden comunicar per defecte les màquines de VNet-A amb VNet-C a través de VNet-B?",
        "opcions": [
            "a) Sí, el VNet Peering és transitiu per defecte.",
            "b) Només si totes estan a la mateixa regió.",
            "c) No, el VNet Peering NO és transitiu; cal configurar un encaminament específic (com un Azure Firewall a VNet-B o un altre peering entre A i C).",
            "d) Sí, sempre que s'utilitzi IPv6."
        ],
        "respostaCorrecta": 2,
        "justificacio": "El Peering no és transitiu, s'ha de configurar la ruta explícitament",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "115. Estàs dissenyant un sistema on milers de missatges breus han de ser enviats entre microserveis sense que cap missatge es perdi si un servei cau. Quin servei esculls?",
        "opcions": [
            "a) Azure Files.",
            "b) Azure Blob Storage.",
            "c) Azure Queue Storage.",
            "d) Azure Application Gateway."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Queue Storage és per enviar missatges asíncrons entre microserveis",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "116. Tens dades emmagatzemades que s'han de conservar per obligació legal durant 10 anys (ex: expedients tancats) però que gairebé no es consulten mai. Quin nivell d'accés (Access Tier) de Blob és el més econòmic per aquest cas?",
        "opcions": [
            "a) Hot (Freqüent).",
            "b) Cool (Esporàdic).",
            "c) Cold.",
            "d) Archive."
        ],
        "respostaCorrecta": 3,
        "justificacio": "Archive: més barat d'emmagatzemar, però penalitza econòmicament i temporal la lectura ràpida",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "117. Quin és l'avantatge clau dels \"Pares de Regions\" (Region Pairs) a Azure?",
        "opcions": [
            "a) Redueixen la latència en fer servir Content Delivery Networks (CDN).",
            "b) Dupliquen el cost però augmenten la velocitat de processament de les VMs.",
            "c) Proporcionen resiliència a nivell geogràfic, garantint que si una regió cau per un desastre (ex: terratrèmol), els serveis continuïn funcionant a l'altra regió de la mateixa geografia.",
            "d) Permeten utilitzar IP públiques xineses a Europa."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Si la regió d'Europa Oest cau completament, la regió pareta assegura la disponibilitat sense sortir de la normativa de zona",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "118. Estàs desplegant l'Azure Kubernetes Service (AKS). Quin concepte descriu una \"màquina de treball\" (física o virtual) on s'allotjaran i correran els teus contenidors (Pods)?",
        "opcions": [
            "a) Cluster Master.",
            "b) Node.",
            "c) Registry.",
            "d) Service Endpoint."
        ],
        "respostaCorrecta": 1,
        "justificacio": "El Nodi (Node",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "119. Es requereix traslladar de forma urgent 50 TB de dades des dels servidors de la Diputació fins a Azure, però l'amplada de banda actual tardaria setmanes. Quin servei ofereix Microsoft per a això?",
        "opcions": [
            "a) Azure File Sync.",
            "b) Azure Data Box.",
            "c) Azure Migrate Network.",
            "d) Azure ExpressRoute Direct."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Azure Data Box és un maletí físic que s'envia a l'empresa per copiar dades de forma off-line",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "120. Les \"Zones de Disponibilitat\" a Azure dins d'una mateixa regió tenen en comú:",
        "opcions": [
            "a) Són gestionades per diferents proveïdors (MS, AWS, Google).",
            "b) Comparteixen el mateix sistema d'energia i refrigeració per estalviar costos.",
            "c) Estan ubicades al mateix edifici però en plantes diferents.",
            "d) Són centres de dades físicament separats, amb energia, xarxa i refrigeració independents."
        ],
        "respostaCorrecta": 3,
        "justificacio": "Separació física, energètica i de xarxa per evitar apagades zonals",
        "tema": "3. Recursos d'Azure"
    },
    {
        "pregunta": "121. Quina sintaxi / sentència inicial és l'habitual en KQL (Kusto Query Language) per consultar logs a Log Analytics d'una taula específica, per exemple la de Seguretat?",
        "opcions": [
            "a) SELECT * FROM SecurityEvent",
            "b) SecurityEvent | where TimeGenerated > ago(1d)",
            "c) GET /SecurityEvent?time=1d",
            "d) grep \"Error\" SecurityEvent"
        ],
        "respostaCorrecta": 1,
        "justificacio": "En KQL s'utilitza la \"pipe\" | per concatenar ordres com where",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "122. Has desplegat una aplicació web i els desenvolupadors volen un servei que rastregi les anomalies de rendiment directament dins del seu codi. Què instal·les?",
        "opcions": [
            "a) Azure Cost Management.",
            "b) Log Analytics.",
            "c) Application Insights.",
            "d) Azure Monitor Network Insights."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Application Insights / APM de codi web i dependències",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "123. Azure Advisor dona consells gratuïts per millorar l'entorn. En quins cinc pilars es basa generalment?",
        "opcions": [
            "a) Costos, Seguretat, Fiabilitat, Excel·lència Operativa i Rendiment.",
            "b) Programació, Disseny, Xarxes, Emmagatzematge i Compliment.",
            "c) Llicències, Windows, Linux, Mac i Android.",
            "d) Azure AD, RBAC, Managed Identities, MFA i PIM."
        ],
        "respostaCorrecta": 0,
        "justificacio": "Són els 5 pilars fonamentals del Microsoft Well-Architected Framework utilitzat per l'Advisor",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "124. Des d'on pots configurar un gràfic visual per observar els pics d'ús de la CPU de totes les teves Màquines Virtuals al mateix temps?",
        "opcions": [
            "a) Des del quadre de comandaments (Dashboard) de l'Azure Monitor.",
            "b) Des de la configuració interna de cada Azure Policy.",
            "c) Des del Microsoft Entra Admin Center.",
            "d) A través d'Azure Resource Manager (ARM)."
        ],
        "respostaCorrecta": 0,
        "justificacio": "Dashboard d'Azure Monitor per centralitzar mètriques",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "125. El Servei de Salut (Azure Service Health) és útil principalment per a:",
        "opcions": [
            "a) Auditar canvis de contrasenyes dels usuaris.",
            "b) Preveure errors en el codi de les Azure Functions.",
            "c) Saber si hi ha talls globals, interrupcions en centres de dades d'Azure o manteniments que afectaran els teus recursos.",
            "d) Monitoritzar la salut dels discos durs SSD a les oficines físiques."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Informa d'estats globals d'Azure fora del teu control particular",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "126. A Log Analytics, com s'anomena l'espai lògic aïllat on es guarden les dades de registre (logs) recollides de diversos recursos?",
        "opcions": [
            "a) Log Repository.",
            "b) Workspace (Espai de treball de Log Analytics).",
            "c) Log Vault.",
            "d) Telemetry Container."
        ],
        "respostaCorrecta": 1,
        "justificacio": "El Workspace de Log Analytics",
        "tema": "4. Monitoratge"
    },
    {
        "pregunta": "127. Quin avantatge ofereix mantenir el fitxer d'estat (terraform.tfstate) de Terraform en un \"backend\" remot com Azure Blob Storage en lloc de guardar-lo en local?",
        "opcions": [
            "a) Permet el treball col·laboratiu en equip i protegeix l'estat si es perd l'equip local.",
            "b) Disminueix els costos de facturació d'Azure un 50%.",
            "c) Compila el codi de Terraform un 80% més ràpid.",
            "d) Obliga a Terraform a utilitzar només recursos PaaS."
        ],
        "respostaCorrecta": 0,
        "justificacio": "El statefile remot permet bloquejos de concurrència i col·laboració segura de l'equip",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "128. Quan una administració pública adopta el núvol, Microsoft aconsella utilitzar el CAF (Cloud Adoption Framework). Què és això?",
        "opcions": [
            "a) Un programari per migrar bases de dades Oracle a Azure.",
            "b) Un conjunt de bones pràctiques, eines i guies metodològiques per alinear el negoci amb l'estratègia tècnica d'adopció al núvol.",
            "c) Un servei IaaS de processament de dades massives.",
            "d) Una política de compliment legal europea."
        ],
        "respostaCorrecta": 1,
        "justificacio": "És la guia mestra de MS d'arquitectura, governança i organització per adoptar el cloud",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "129. Què és i per a què serveix Azure Arc en entorns híbrids?",
        "opcions": [
            "a) Un arc òptic submarí per interconnectar regions d'Azure.",
            "b) Un servei que extén l'administració i governança d'Azure (com RBAC o Policies) a recursos que viuen fora d'Azure, com servidors Linux/Windows on-premise o clústers d'altres núvols.",
            "c) Una base de dades SQL totalment autogestionada.",
            "d) Un balancejador de càrrega per a VPNs rurals."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Aporta la governança, seguretat i monitoratge d'Azure a qualsevol lloc, inclòs on-prem",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "130. Estàs estructurant un patró d'arquitectura orientat a esdeveniments (Event-driven). Quina solució ofereix l'enrutament serverless \"pub/sub\" massiu i escalable a Azure?",
        "opcions": [
            "a) Azure Event Grid.",
            "b) Azure Arc.",
            "c) Azure Blob Storage.",
            "d) Azure Cognitive Search."
        ],
        "respostaCorrecta": 0,
        "justificacio": "L 'Event Grid és un router massiu d'esdeveniments tipus pub/sub",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "131. Quina és la funció d'una \"Landing Zone\" (Zona d'Aterratge) a Azure?",
        "opcions": [
            "a) Oferir un servidor temporal on provar aplicacions durant 1 hora abans d'esborrar-les.",
            "b) Proporcionar un entorn fundacional preconfigurat (mitjançant codi) que inclou ja l'escala, la seguretat, l'arquitectura de xarxa i la governança perquè les noves càrregues de treball es despleguin segures des del minut 0.",
            "c) És el directori on es desen els arxius adjunts dels correus de Microsoft 365.",
            "d) Redirigir automàticament els atacs de hackers cap a un entorn aïllat."
        ],
        "respostaCorrecta": 1,
        "justificacio": "La Landing Zone és el ciment inicial per establir el govern, xarxa i identitat",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "132. Què defineixen les plantilles d'Azure Resource Manager (ARM Templates)?",
        "opcions": [
            "a) El codi en C# d'una aplicació web.",
            "b) La definició programàtica d'una infraestructura en format JSON (Infraestructura com a Codi).",
            "c) Els logs i les auditories d'inicis de sessió fallits.",
            "d) La taula de preus de les instàncies reservades."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Plantilles JSON per desplegar Azure (IaaC",
        "tema": "5. Disseny i Arquitectura"
    },
    {
        "pregunta": "133. Quin és el cor funcional d'un sistema RAG (Retrieval-Augmented Generation) integrat amb un servei de bases de dades a Azure?",
        "opcions": [
            "a) Fer consultes SQL pures contra el model GPT per veure si recorda les dades.",
            "b) Convertir els documents interns de l'empresa en vectors (Vector Search) perquè el sistema RAG pugui recuperar les parts rellevants pel context abans de demanar a la IA que generi la resposta.",
            "c) Reentrenar massivament els pesos del model GPT-4 amb informació corporativa cada nit.",
            "d) Generar imatges aleatòries i convertir-les en text."
        ],
        "respostaCorrecta": 1,
        "justificacio": "La vectorització permet trobar el \"sentit/proximitat\" dels textos perquè el RAG triï el millor context",
        "tema": "6. IA"
    },
    {
        "pregunta": "134. A l'hora de parametritzar un model a Azure OpenAI (com GPT-4), què és el \"System Prompt\" o missatge del sistema?",
        "opcions": [
            "a) El missatge que escriu l'usuari final per fer una pregunta.",
            "b) El text d'avís de privacitat que apareix abans de llançar l'aplicació.",
            "c) Les instruccions base (metaprompt) dissenyades per l'arquitecte on es defineix la personalitat, el to i les normes de comportament fonamentals que la IA ha de seguir durant tota la sessió.",
            "d) La resposta que dona la IA."
        ],
        "respostaCorrecta": 2,
        "justificacio": "El \"System Prompt\" configura el rol de l'Agent d'IA",
        "tema": "6. IA"
    },
    {
        "pregunta": "135. Quin compromís principal de seguretat assumeix Microsoft amb l'ús empresarial d'Azure OpenAI?",
        "opcions": [
            "a) El codi o dades subministrats per la Diputació s'utilitzaran per millorar els models base d'OpenAI a nivell mundial.",
            "b) Les dades de les sol·licituds (prompts) del client i les respostes no s'utilitzen per entrenar els models fundacionals públics.",
            "c) L 'emmagatzematge de dades serà sempre públic per defecte.",
            "d) OpenAI Company té accés lliure i irrestricte als comptes de Microsoft Entra ID."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Privacitat total: OpenAI no utilitza les teves dades per ser més intel·ligent a nivell públic",
        "tema": "6. IA"
    },
    {
        "pregunta": "136. L 'eina \"Azure AI Foundry\" es presenta com un superconjunt davant d'Azure OpenAI perquè...",
        "opcions": [
            "a) Inclou exclusivament models de Microsoft i descarta els de codi obert.",
            "b) Permet dissenyar, avaluar i orquestrar sistemes sencers (com RAG) gestionant el cicle de vida complet i permetent l'ús de models tant d'OpenAI com de tercers (ex: LLaMa, Mistral).",
            "c) Només funciona si les dades resideixen a centres de dades dels EUA.",
            "d) És gratuïta i no suporta instàncies privades."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Estudi/Foundry orquestra sistemes complexos i admet models no només d'OpenAI sinó de tercers com LLaMa",
        "tema": "6. IA"
    },
    {
        "pregunta": "137. Quin és el propòsit d'Azure Government Cloud?",
        "opcions": [
            "a) Optimitzar costos de campanyes polítiques.",
            "b) Disposar de regions físicament aïllades i operades per personal autoritzat, dedicades exclusivament al sector públic per mantenir la sobirania de dades i el compliment normatiu estricte.",
            "c) Oferir plantilles web gratuïtes per a ajuntaments d'arreu del món.",
            "d) Guardar registres d'activitat de xarxes socials públiques."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Governs federals i ens públics amb necessitats d'alta sobirania",
        "tema": "6. IA"
    },
    {
        "pregunta": "138. La teva entitat pública ha de complir de manera exhaustiva amb el Reglament General de Protecció de Dades (RGPD/GDPR) i el principi de \"Privacy by Design\". Quina eina nativa utilitzaràs per monitorar i auditar automàticament si l'entorn de núvol està complint amb els controls específics del RGPD?",
        "opcions": [
            "a) Microsoft Defender for Cloud (apartat d'Avaluació de Compliment Normatiu / Regulatory Compliance).",
            "b) Azure ExpressRoute.",
            "c) Túnels SSH configurats manualment.",
            "d) Azure Traffic Manager Analytics."
        ],
        "respostaCorrecta": 0,
        "justificacio": "El Defender for Cloud ofereix avaluacions de compliment mapejades a normatives com ISO i RGPD",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "139. Si elimines per error un secret o certificat a l'Azure Key Vault, com el pots recuperar?",
        "opcions": [
            "a) No es pot recuperar mai sota cap concepte; s'esborra de forma irrecuperable al moment.",
            "b) Trucant immediatament al servei tècnic de Windows.",
            "c) Si la funcionalitat \"Soft Delete\" (Supressió temporal) està activada, el secret es reté durant un període determinat (ex: 90 dies) i es pot restaurar.",
            "d) Fent un control+Z a l'Azure Cloud Shell."
        ],
        "respostaCorrecta": 2,
        "justificacio": "El Soft Delete dona un marge de seguretat abans de l'eliminació permanent",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "140. El Firewall d'Azure és \"Stateful\" (amb estat). Què vol dir això en termes d'arquitectura de xarxa en comparació amb un tallafoc \"Stateless\"?",
        "opcions": [
            "a) Que no sap diferenciar entre protocols UDP i TCP.",
            "b) Que només filtra trànsit sortint cap a l'exterior.",
            "c) Que \"recorda\" les connexions establertes i l'estat dels paquets; si permet una sol·licitud de sortida, permetrà automàticament la resposta entrant corresponent sense necessitat d'una regla explícita de retorn.",
            "d) Que sempre denega qualsevol connexió de sortida."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Guarda \"l'estat\" de la connexió permetent el retorn sense regles addicionals",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "141. Quin tipus de Lock (Bloqueig) aplicat a un Grup de Recursos permet a un usuari llegir les dades de la VNet interior, i fins i tot canviar-ne la IP, però li impedeix esborrar-la?",
        "opcions": [
            "a) CanNotDelete (Delete).",
            "b) ReadOnly (Lector).",
            "c) AdministratorLock.",
            "d) ImmutableLock."
        ],
        "respostaCorrecta": 0,
        "justificacio": "El CanNotDelete prevé l'esborrament exclusivament",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "142. Si utilitzes Azure Policy i una Màquina Virtual es crea incomplint una de les teves normes (per exemple, sense una extensió d'antivirus), què pot fer Azure Policy?",
        "opcions": [
            "a) Desactivar el compte de l'usuari que ho ha fet.",
            "b) Facturar el doble pel recurs.",
            "c) Pot auditar l'incompliment o, si s'usa l'efecte \"DeployIfNotExists/Remediate\", instal·lar automàticament l'extensió perquè compleixi la norma.",
            "d) Esborrar tot el grup de recursos complet."
        ],
        "respostaCorrecta": 2,
        "justificacio": "La Política té el poder d'arreglar, \"Remediate\", el recurs si no compleix l'estàndard",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "143. Quin avantatge ofereix un Private Endpoint respecte a un Service Endpoint a Azure?",
        "opcions": [
            "a) El Service Endpoint és completament tancat a internet, el Private no.",
            "b) El Private Endpoint ofereix una connexió completament privada utilitzant una IP interna de la teva pròpia VNet i funciona amb accessos des d'On-Premise; el Service Endpoint fa servir la infraestructura global però l'adreça de destinació continua sent pública.",
            "c) Són exactament el mateix, només canvia el preu de lloguer.",
            "d) El Private Endpoint només funciona per a bases de dades NoSQL."
        ],
        "respostaCorrecta": 1,
        "justificacio": "El Private Endpoint ingressa el servei dins la teva pròpia VNet amb IP local",
        "tema": "7. Seguretat"
    },
    {
        "pregunta": "144. Què fa un Grup d'Acció (Action Group) dins de l'apartat de Pressupostos (Budgets) d'Azure Cost Management?",
        "opcions": [
            "a) Esborra automàticament la subscripció quan s'arriba al pressupost màxim.",
            "b) Executa accions automàtiques (com enviar un correu electrònic, un SMS, o cridar un Webhook per aturar una màquina) quan la despesa arriba a un llindar definit (ex: 90% del pressupost).",
            "c) Sincronitza el pressupost amb els comptes bancaris de la Diputació.",
            "d) Apaga sempre el servidor Azure Active Directory per estalviar."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Grups d'Acció configuren què passarà quan s'arribi al pressupost",
        "tema": "8. Governança"
    },
    {
        "pregunta": "145. Com es poden heretar les etiquetes (Tags) d'un Grup de Recursos cap als recursos que conté si sabem que Azure NO ho fa per defecte?",
        "opcions": [
            "a) Només es poden posar manualment un per un.",
            "b) Amb un script en llenguatge C++.",
            "c) Configurant una regla d'Azure Policy amb l'efecte de modificar (Modify) o heretar l'etiqueta (Inherit a tag from the resource group).",
            "d) Reiniciant el Management Group pare."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Amb l'Azure Policy assignant l'efecte Modify als recursos que neixin sense tag",
        "tema": "8. Governança"
    },
    {
        "pregunta": "146. Quants nivells de profunditat com a màxim pot tenir un arbre de Grups d'Administració (Management Groups) a Azure per organitzar l'organigrama empresarial?",
        "opcions": [
            "a) 1 nivell (només el tenant i a sota les subscripcions).",
            "b) 6 nivells de profunditat.",
            "c) 15 nivells de profunditat.",
            "d) Infinits nivells, depèn de la mida de l'empresa."
        ],
        "respostaCorrecta": 1,
        "justificacio": "6 nivells per sota del Root Management Group",
        "tema": "8. Governança"
    },
    {
        "pregunta": "147. Si contractes una Instància Reservada de Màquines Virtuals per 3 anys, Azure t'ofereix gran flexibilitat, però què vol dir exactament?",
        "opcions": [
            "a) Que pots intercanviar la instància reservada per una altra de característiques similars o cancel·lar-la abans d'hora (sota determinades condicions i límits) si el negoci canvia.",
            "b) Que la Màquina Virtual pot canviar del sistema operatiu Windows a Mac en calent.",
            "c) Que es paga exclusivament al final del tercer year.",
            "d) Que la màquina mai podrà ser aturada per l'usuari durant aquests 3 anys."
        ],
        "respostaCorrecta": 0,
        "justificacio": "Ofereixen flexibilitat d'intercanvi o reemborsament sota certes limitacions",
        "tema": "8. Governança"
    },
    {
        "pregunta": "148. A què fa referència el terme \"Quotes de Servei\" o \"Límits de Subscripció\" a Azure?",
        "opcions": [
            "a) És el nombre màxim de passwords que pot tenir un usuari.",
            "b) És el límit establert per Microsoft sobre la quantitat de recursos d'un tipus concret (ex: màxim de CPUs virtuals d'una família) que es poden desplegar en una subscripció per protegir-la de despeses accidentals extremes o atacs maliciosos.",
            "c) És la quota mínima mensual que has de gastar per mantenir viu l'entorn.",
            "d) És el límit de regles d'un NSG (sempre 10)."
        ],
        "respostaCorrecta": 1,
        "justificacio": "Mecanisme de seguretat global de Subscripció",
        "tema": "8. Governança"
    },
    {
        "pregunta": "149. En l'eina Azure Cost Management, la vista \"Anàlisi de Costos\" ens permet agrupar els costos generats segons el seu \"MeterCategory\". Què és el \"Meter\"?",
        "opcions": [
            "a) Un aparell de lectura física als centres de dades de Microsoft.",
            "b) L 'identificador de l'usuari de l'Active Directory.",
            "c) El comptador/unitat de mesura interna del servei consumit (ex: GBs de sortida de xarxa, hores d'execució de CPU).",
            "d) La taxa d'impostos de la regió de desplegament."
        ],
        "respostaCorrecta": 2,
        "justificacio": "La unitat de mesura base de consum facturable",
        "tema": "8. Governança"
    },
    {
        "pregunta": "150. Azure Advisor té un apartat d'Optimització de Costos. Quin dels següents escenaris identificarà ràpidament?",
        "opcions": [
            "a) T'avisarà si l'adreça IP pública ha canviat de número.",
            "b) Et recomanarà esborrar els passwords d'usuaris inactius.",
            "c) Detectarà màquines virtuals amb un ús de CPU inferior al 5% sostingut i et proposarà reduir-ne la mida o apagar-les.",
            "d) Esborrarà automàticament els teus arxius de còpia de seguretat antics sense previ avís."
        ],
        "respostaCorrecta": 2,
        "justificacio": "Cerca el \"waste\" o recursos infrautilitzats per salvar pressupost",
        "tema": "8. Governança"
    }
];