CREATE OR REPLACE VIEW "public"."sequenced" AS 
SELECT id, regexp_replace(artworks.title, '^.* ', '')::int as sequence
FROM artworks;
