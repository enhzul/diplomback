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
      ,st.visible
  FROM [dp].[dbo].[students] st
left join departments d on d.id=st.department_id
LEFT JOIN tsolZereg tsol on tsol.id = st.zereg_id
left join users us on us.id=st.userID
where us.id = @id