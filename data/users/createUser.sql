INSERT INTO [dp].[dbo].[users] 
(     
    username,
    password,
    status
)
VALUES (
    @username,
    @password,
    @status
);

select SCOPE_IDENTITY() AS id