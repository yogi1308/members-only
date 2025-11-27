--
-- PostgreSQL database dump
--

\restrict WiWsM9QGF0CF1C5dl6b00eVMisJk3njlmQtMfO0FMY9nqSkhyCgaTPQlsJBkohb

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: yogi
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    date_posted character varying NOT NULL,
    user_id uuid
);



--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: yogi
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yogi
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: yogi
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255),
    password character varying(255),
    icon_color character varying(7),
    member boolean DEFAULT false
);



--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: yogi
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: yogi
--

COPY public.posts (id, title, content, date_posted, user_id) FROM stdin;
1	FIRST POST!!!	Hello World!!!!!	22/11/2025 11:19	9309e0e5-f1d9-4b9e-a024-8a1ecdb19179
2	Yo	YOOOOO!!!!!\r\n\r\n\r\n\r\n\r\n\r\n\r\n	22/11/2025 11:41	9f624621-fdfe-4945-9374-ab6bbd1f2261
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yogi
--

COPY public.users (id, username, password, icon_color, member) FROM stdin;
a8d9b23f-2890-4ff6-9df1-956e04cc4dd1	One	$2b$10$15wpPWeG72EoTBQIr6ZB7eCF92N4HUNxt8eyyY0lwH66exZ7uOXpW	#925b68	f
9f624621-fdfe-4945-9374-ab6bbd1f2261	Yo	$2b$10$vHoUCpx.pyWR1rJhys/vceUgq2lJwYDd4FntVCgtGhAHre24sPWz.	#7b39c2	f
9309e0e5-f1d9-4b9e-a024-8a1ecdb19179	yogi	$2b$10$EDaG2zCKqaZO93B/g6NZo.0qyvwrvXP7yUtOHiXbZX5U0ognw0fKW	#a64a58	t
88d18054-7cf6-4017-ab47-c8e6b47899d4	yogi	$2b$10$Fw0937WtCQNODMFrtk7PFeWDtjec6ebU.STnzlQWjDObup6lD1RWa	#c5d01e	f
8df7117e-8f52-486d-a8f8-1f62acc9a8fa	ugkbg	$2b$10$ITQ1SLL2rwWCE7MEjxdNjuUGNdQ6AY5dwAfrVI8cSIvuNDXvmrFl2	#22fdef	f
e656d4d8-7611-4233-a59c-cb109cd83682	bibhyg	$2b$10$uHNYM6KtHIkCyvHTpdr3puvgM98ux57wpFFCwlbordHPQDxs32zDe	#d512f1	f
\.


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yogi
--

SELECT pg_catalog.setval('public.posts_id_seq', 2, true);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: yogi
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: yogi
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yogi
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict WiWsM9QGF0CF1C5dl6b00eVMisJk3njlmQtMfO0FMY9nqSkhyCgaTPQlsJBkohb

