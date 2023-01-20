alter table "public"."artworks" alter column "is_one_time_royalty" set default false;
alter table "public"."artworks" alter column "is_one_time_royalty" drop not null;
alter table "public"."artworks" add column "is_one_time_royalty" bool;
