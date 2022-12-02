INSERT INTO [dp].[dbo].[roleUser] 
(     
    userID,
    roleId
)
VALUES (
    @userID,
    @roleId
);

select SCOPE_IDENTITY() AS id