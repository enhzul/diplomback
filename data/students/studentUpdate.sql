update [dp].[dbo].[students]
set [first_name] = @first_name,
      [last_name] = @last_name,
      [phone] = @phone,
      [department_id] = @department_id,
      [email] = @email,
      [school_startDate] = @school_startDate,
      [school_startEnd] = @school_startEnd,
      [zereg_id] = @zereg_id,
      [updated_dat] = @updated_dat
where userId = @userId

SELECT userName,
      [first_name]
      ,[last_name]
      ,[phone]
      ,[dp_name]
      ,[email]
      ,[school_startDate]
      ,[school_startEnd]
      ,tsol.zeregName
      ,st.created_at
  FROM [dp].[dbo].[students] st
left join departments d on d.id=st.department_id
LEFT JOIN tsolZereg tsol on tsol.id = st.zereg_id
left join users us on us.id=st.userID
where st.userId = @userId