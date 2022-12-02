SELECT first_name, last_name, username, email, status, us.created_at from users us
left join roleUser ro on us.id= ro.userId
left join roles r on ro.roleId= r.id
left join students ut on ut.userID=us.id