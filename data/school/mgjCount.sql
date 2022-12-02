select m.name,count(m.id) as countToo from holboos ho 
left join students st on ho.student_id = st.id
left join branch b on ho.branch_id = b.id
left join departments d on ho.department_id = d.id
left join mergejil m on ho.mergejil_id = m.id
group by m.name
order by count(m.id) desc