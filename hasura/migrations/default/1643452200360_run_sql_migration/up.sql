CREATE OR REPLACE FUNCTION public.trigger_set_user_has_samples()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.user_id != NULL THEN
        UPDATE users SET has_samples = true WHERE id = NEW.user_id;
    END IF;

    RETURN NEW; 
END;
$function$;
