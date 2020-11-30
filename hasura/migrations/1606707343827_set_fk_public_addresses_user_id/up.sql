alter table "public"."addresses" drop constraint "addresses_wallet_id_fkey",
             add constraint "addresses_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update restrict on delete restrict;
