select * from users us
left join roleUser ro on us.id= ro.userId
left join roles r on ro.roleId=r.id
 where username = @username