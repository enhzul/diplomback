
update [dp].[dbo].[users]
set [token] = @token
where id = @userId


select * from users
where id = @userId