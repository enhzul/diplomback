--  select first_name, last_name,email,phone,branch_name, dp_name,zeregName, school_startDate,school_startEnd, st.created_at name from holboos ho 
--  left join students st on ho.student_id = st.id
--  left join branch b on ho.branch_id = b.id
--  left join departments d on ho.department_id = d.id
--  left join mergejil m on ho.mergejil_id = m.id
--  left join tsolZereg tsol on st.zereg_id=tsol.id

select first_name, last_name,email,phone,branch_name,dp_name,name ,zeregName,school_startDate,school_startEnd from holboos ho 
 left join students st on ho.student_id = st.id
 left join branch b on ho.branch_id = b.id
 left join departments d on ho.department_id = d.id
 left join mergejil m on ho.mergejil_id = m.id
 left join tsolZereg tsol on st.zereg_id=tsol.id where st.visible=1