package com.culetter.db.repository;

import com.culetter.db.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findByType(String type);
}
