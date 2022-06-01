CREATE OR REPLACE FUNCTION public.trigger_unset_user_has_samples()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF (SELECT EXISTS (SELECT id FROM samples WHERE user_id = OLD.user_id)) THEN
        RETURN OLD; 
    ELSE
        UPDATE users SET has_samples = false WHERE id = OLD.user_id AND has_samples = true;
    
        RETURN OLD; 
    END IF;
END;
$function$;
