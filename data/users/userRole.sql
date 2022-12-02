SELECT us.id,
      [first_name]
      ,[last_name]
      ,[mail]
      ,[phone]
      ,[pwd_status]
      ,[prem_status]
      ,[comp_id],
	  ur.roleId,
	  ur.roleName
  FROM [dp].[dbo].[users] us
  left join userRole ur on us.id= ur.userId
  where us.id = @userId