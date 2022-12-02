SELECT username, status, role_name, us.created_at from users us
left join roleUser ro on us.id= ro.userId
left join roles r on ro.roleId= r.id
where us.id=@userId